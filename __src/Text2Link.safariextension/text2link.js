var Text2Link = {

  OPEN_LINK_SETTING_NEVER: 1,
  OPEN_LINK_SETTING_DOUBLE_CLICK: 2,
  OPEN_LINK_SETTING_CMD_DOUBLE_CLICK: 3,
  OPEN_LINK_SETTING_OPTION_DOUBLE_CLICK: 4,
  OPEN_LINK_SETTING_SHIFT_DOUBLE_CLICK: 5,

  validTopLevelDomains: [
    // gTLD
    'aero',
    'arpa',
    'asia',
    'biz',
    'cat',
    'com',
    'coop',
    'edu',
    'gov',
    'info',
    'int',
    'jobs',
    'mil',
    'mobi',
    'museum',
    'name',
    'nato',
    'net',
    'org',
    'pro',
    'tel',
    'travel',

    // ccTLD
    'ac',
    'ad',
    'ae',
    'af',
    'ag',
    'ai',
    'al',
    'am',
    'an',
    'ao',
    'aq',
    'ar',
    'as',
    'at',
    'au',
    'aw',
    'ax',
    'az',
    'ba',
    'bb',
    'bd',
    'be',
    'bf',
    'bg',
    'bh',
    'bi',
    'bj',
    'bm',
    'bn',
    'bo',
    'br',
    'bs',
    'bt',
    'bv',
    'bw',
    'by',
    'bz',
    'ca',
    'cc',
    'cd',
    'cf',
    'cg',
    'ch',
    'ci',
    'ck',
    'cl',
    'cm',
    'cn',
    'co',
    'cr',
    'cs',
    'cu',
    'cv',
    'cx',
    'cy',
    'cz',
    'dd',
    'de',
    'dj',
    'dk',
    'dm',
    'do',
    'dz',
    'ec',
    'ee',
    'eg',
    'eh',
    'er',
    'es',
    'et',
    'eu',
    'fi',
    'fj',
    'fk',
    'fm',
    'fo',
    'fr',
    'ga',
    'gb',
    'gd',
    'ge',
    'gf',
    'gg',
    'gh',
    'gi',
    'gl',
    'gm',
    'gn',
    'gp',
    'gq',
    'gr',
    'gs',
    'gt',
    'gu',
    'gw',
    'gy',
    'hk',
    'hm',
    'hn',
    'hr',
    'ht',
    'hu',
    'id',
    'ie',
    'il',
    'im',
    'in',
    'io',
    'iq',
    'ir',
    'is',
    'it',
    'je',
    'jm',
    'jo',
    'jp',
    'ke',
    'kg',
    'kh',
    'ki',
    'km',
    'kn',
    'kp',
    'kr',
    'kw',
    'ky',
    'kz',
    'la',
    'lb',
    'lc',
    'li',
    'lk',
    'lr',
    'ls',
    'lt',
    'lu',
    'lv',
    'ly',
    'ma',
    'mc',
    'md',
    'me',
    'mg',
    'mh',
    'mk',
    'ml',
    'mm',
    'mn',
    'mo',
    'mp',
    'mq',
    'mr',
    'ms',
    'mt',
    'mu',
    'mv',
    'mw',
    'mx',
    'my',
    'mz',
    'na',
    'nc',
    'ne',
    'nf',
    'ng',
    'ni',
    'nl',
    'no',
    'np',
    'nr',
    'nu',
    'nz',
    'om',
    'pa',
    'pe',
    'pf',
    'pg',
    'ph',
    'pk',
    'pl',
    'pm',
    'pn',
    'pr',
    'ps',
    'pt',
    'pw',
    'py',
    'qa',
    're',
    'ro',
    'rs',
    'ru',
    'rw',
    'sa',
    'sb',
    'sc',
    'sd',
    'se',
    'sg',
    'sh',
    'si',
    'sj',
    'sk',
    'sl',
    'sm',
    'sn',
    'so',
    'sr',
    'st',
    'su',
    'sv',
    'sy',
    'sz',
    'tc',
    'td',
    'tf',
    'tg',
    'th',
    'tj',
    'tk',
    'tl',
    'tm',
    'tn',
    'to',
    'tp',
    'tr',
    'tt',
    'tv',
    'tw',
    'tz',
    'ua',
    'ug',
    'uk',
    'um',
    'us',
    'uy',
    'uz',
    'va',
    'vc',
    've',
    'vg',
    'vi',
    'vn',
    'vu',
    'wf',
    'ws',
    'ye',
    'yt',
    'yu',
    'za',
    'zm',
    'zr',
    'zw',

    // IDN
    'бг',
    'рф',
    'укр',
    'भारत',
    'ไทย',
    '中国',
    '中國',
    '香港',
    '台灣',
    '台湾',
    '日本'
  ],

  settings: {
    openLinkInCurrentTab: 2,
    openLinkInNewTab: 3,
    openLinkInNewWindow: 1
  },

  handleEvent: function (event) {
    switch (event.type) {
      case 'unload':
        event.target.removeEventListener('dblclick', this, true);
        return;
      case 'dblclick':
      case 'contextmenu':
        this.openClickedURI(event);
        break;
    }
  },

  openClickedURI: function (event) {
    var frame = event.view;

    var selection = frame.getSelection();
    if (!selection.rangeCount)
      return null;

    var range = selection.getRangeAt(0).cloneRange();

    var parentNode = range.startContainer;
    if (parentNode.nodeType !== Node.TEXT_NODE)
      return null;

    var parentOffset = range.startOffset;

    var parentNodeText = parentNode.nodeValue;

    var noWsValue = '';

    var i, addedBefore = 0, addedAfter = 0;

    i = parentOffset;
    while (i < parentNodeText.length && !(/[\s]/i).test(parentNodeText[i])) {
      noWsValue += parentNodeText[i];
      i++;
      addedAfter++;
    }
    addedAfter -= range.endOffset - range.startOffset;

    i = parentOffset - 1;
    while (i >= 0 && !(/[\s]/i).test(parentNodeText[i])) {
      noWsValue = parentNodeText[i] + noWsValue;
      i--;
      addedBefore++;
    }

    var shrinked = this.shrinkToValidLink(noWsValue, addedBefore, addedAfter);
    if (shrinked) {
      var newRange = document.createRange();

      newRange.setStart(parentNode, range.startOffset - addedBefore + shrinked.startOffset);
      newRange.setEnd(parentNode, range.endOffset + addedAfter - shrinked.endOffset);
      selection.removeAllRanges();
      selection.addRange(newRange);

      if ('dblclick' == event.type)
        this.openLink(this.fixLink(shrinked.link), event);
    }
    if ('contextmenu' == event.type)
      safari.self.tab.setContextMenuEventUserInfo(event, shrinked ? this.fixLink(shrinked.link) : null);
  },

  shrinkToValidLink: function (string, addedBefore, addedAfter) {
    var regExpWithScheme = /^((?:[a-z]+?):\/\/(?:.+?\.(?:[^\s{}\(\)\[\]]+[^\s,\.\;{}\(\)\[\]])))$/im;
    var regExpWithoutScheme = new RegExp('^((?:[A-Za-z0-9\\-\\.]+)\\.(?:' + this.validTopLevelDomains.join('|') + ')(?:(?:\\/[^\\s{}\\(\\)\\[\\]]*[^\\.,\\s{}\\(\\)\\[\\]]?)?))$', 'im');
    if (regExpWithScheme.test(string) || regExpWithoutScheme.test(string))
      return {link: string, startOffset: 0, endOffset: 0};

    var strLen = string.length;

    var str, str1, i = 0, j;
    while (i <= addedBefore) {
      str = string.substring(i, strLen);

      j = 0;
      while (j <= addedAfter) {
        str1 = str.substring(0, str.length - j);
        if (regExpWithScheme.test(str1) || regExpWithoutScheme.test(str1)) {
          return {link: str1, startOffset: i, endOffset: j};
        }
        while (j <= addedAfter && (/[\w]/i).test(str1[str.length - j]))
          j++;
      }

      i++;
    }

    return false;
  },

  fixLink: function (link) {
    var scheme = 'http://';

    if (/^.+?:\/\//.test(link)) {
      scheme = link.substring(0, link.indexOf(':') + 3);
      link = link.substring(link.indexOf(':') + 3);
    }

    if (link.indexOf('/') > 0) {
      var authority = link.substring(0, link.indexOf('/'));
      var pathQueryFragment = link.substring(link.indexOf('/'));
    } else {
      var authority = link;
      var pathQueryFragment = '/';
    }
    return this.fixScheme(scheme) + this.fixAuthority(authority) + pathQueryFragment;
  },

  fixAuthority: function (authority) {
    var result = '', port;

    if (authority.indexOf('@') > 0) {
      result += authority.substring(0, link.indexOf('@') + 1);
      authority = authority.substring(link.indexOf('@') + 1);
    }

    if (authority.lastIndexOf(':') > 0) {
      port = authority.substring(link.lastIndexOf(':') + 1);
      authority = authority.substring(0, link.lastIndexOf(':'));
    }

    var host = '';
    var hostParts = authority.split('.');
    for (var i = 0; i < hostParts.length; i++) {
      if (!(/^[!$&'()*+,;=\-._~%abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890]*$/im).test(hostParts[i]))
        hostParts[i] = 'xn--' + punycode.encode(hostParts[i]);
    }

    return result + hostParts.join('.').toLowerCase() + (port ? ':' + port : '');
  },

  fixScheme: function (scheme) {
    if (/(http|https|ftp|telnet|mms|ed2k|file):\/\//.test(scheme)) {
      return scheme;
    }

    if ('ttps://' == scheme || 'tps://' == scheme || 'ps://' == scheme) {
      return 'https://';
    }

    return 'http://';
  },

  openLink: function (link, event) {
    if (!link)
      return;
    var p = {link: link};

    if (event.altKey) {
      if (this.settings.openLinkInCurrentTab == this.OPEN_LINK_SETTING_OPTION_DOUBLE_CLICK) {
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      } else if (this.settings.openLinkInNewTab == this.OPEN_LINK_SETTING_OPTION_DOUBLE_CLICK) {
        p.newTab = true;
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      } else if (this.settings.openLinkInNewWindow == this.OPEN_LINK_SETTING_OPTION_DOUBLE_CLICK) {
        p.newWindow = true;
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      }
    }

    if (event.shiftKey) {
      if (this.settings.openLinkInCurrentTab == this.OPEN_LINK_SETTING_SHIFT_DOUBLE_CLICK) {
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      } else if (this.settings.openLinkInNewTab == this.OPEN_LINK_SETTING_SHIFT_DOUBLE_CLICK) {
        p.newTab = true;
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      } else if (this.settings.openLinkInNewWindow == this.OPEN_LINK_SETTING_SHIFT_DOUBLE_CLICK) {
        p.newWindow = true;
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      }
    }

    if (event.metaKey) {
      if (this.settings.openLinkInCurrentTab == this.OPEN_LINK_SETTING_CMD_DOUBLE_CLICK) {
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      } else if (this.settings.openLinkInNewTab == this.OPEN_LINK_SETTING_CMD_DOUBLE_CLICK) {
        p.newTab = true;
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      } else if (this.settings.openLinkInNewWindow == this.OPEN_LINK_SETTING_CMD_DOUBLE_CLICK) {
        p.newWindow = true;
        safari.self.tab.dispatchMessage('openLink', p);
        return;
      }
    }

    if (this.settings.openLinkInCurrentTab == this.OPEN_LINK_SETTING_DOUBLE_CLICK) {
      safari.self.tab.dispatchMessage('openLink', p);
      return;
    } else if (this.settings.openLinkInNewTab == this.OPEN_LINK_SETTING_DOUBLE_CLICK) {
      p.newTab = true;
      safari.self.tab.dispatchMessage('openLink', p);
      return;
    } else if (this.settings.openLinkInNewWindow == this.OPEN_LINK_SETTING_DOUBLE_CLICK) {
      p.newWindow = true;
      safari.self.tab.dispatchMessage('openLink', p);
      return;
    }
  },

  onMessage: function (event) {
    switch (event.name) {
      case 'settings':
        Text2Link.settings = event.message;
        break;
    }
  },

  init: function () {
    document.addEventListener('dblclick', this, true);
    document.addEventListener('unload', this, true);
    document.addEventListener('contextmenu', this, false);

    safari.self.addEventListener('message', this.onMessage, false);
    safari.self.tab.dispatchMessage('getGettings', '');
  }
}

try {
  Text2Link.init();
} catch (e) {}

//Javascript UTF16 converter created by some@domain.name
//This implementation is released to public domain
//
// http://stackoverflow.com/questions/183485/can-anyone-recommend-a-good-free-javascript-for-punycode-to-unicode-conversion
var utf16 = {
    decode:function(input){
        var output = [], i=0, len=input.length,value,extra;
        while (i < len) {
                value = input.charCodeAt(i++);
                if ((value & 0xF800) === 0xD800) {
                        extra = input.charCodeAt(i++);
                        if ( ((value & 0xFC00) !== 0xD800) || ((extra & 0xFC00) !== 0xDC00) ) {
                                throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
                        }
                        value = ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
                }
                output.push(value);
        }
        return output;
    },
    encode:function(input){
        var output = [], i=0, len=input.length,value;
        while (i < len) {
                value = input[i++];
                if ( (value & 0xF800) === 0xD800 ) {
                        throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
                }
                if (value > 0xFFFF) {
                        value -= 0x10000;
                        output.push(String.fromCharCode(((value >>>10) & 0x3FF) | 0xD800));
                        value = 0xDC00 | (value & 0x3FF);
                }
                output.push(String.fromCharCode(value));
        }
        return output.join("");
    }
}

//Javascript Punycode converter derived from example in RFC3492.
//This implementation is created by some@domain.name and released to public domain    
var punycode = new function Punycode() {
    var initial_n = 0x80;
    var initial_bias = 72;
        var delimiter = "\x2D";
    var base = 36;
    var damp = 700;
    var tmin=1;
    var tmax=26;
    var skew=38;

    var maxint = 0x7FFFFFFF;
    // decode_digit(cp) returns the numeric value of a basic code 
    // point (for use in representing integers) in the range 0 to
    // base-1, or base if cp is does not represent a value.

    function decode_digit(cp) {
        return  cp - 48 < 10 ? cp - 22 :  cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base;
    }

    // encode_digit(d,flag) returns the basic code point whose value      
    // (when used for representing integers) is d, which needs to be in   
    // the range 0 to base-1.  The lowercase form is used unless flag is  
    // nonzero, in which case the uppercase form is used.  The behavior   
    // is undefined if flag is nonzero and digit d has no uppercase form. 

    function encode_digit(d, flag) {
        return d + 22 + 75 * (d < 26) - ((flag != 0) << 5);
        //  0..25 map to ASCII a..z or A..Z 
        // 26..35 map to ASCII 0..9         
    }
    //** Bias adaptation function **
    function adapt(delta, numpoints, firsttime ) {
        var k;
        delta = firsttime ? Math.floor(delta / damp) : (delta >> 1);
        delta += Math.floor(delta / numpoints);

        for (k = 0;  delta > (((base - tmin) * tmax) >> 1);  k += base) {
                delta = Math.floor(delta / ( base - tmin ));
        }
        return Math.floor(k + (base - tmin + 1) * delta / (delta + skew));
    }

    // encode_basic(bcp,flag) forces a basic code point to lowercase if flag is zero,
    // uppercase if flag is nonzero, and returns the resulting code point.
    // The code point is unchanged if it  is caseless.
    // The behavior is undefined if bcp is not a basic code point.                                                   

    function encode_basic(bcp, flag) {
        bcp -= (bcp - 97 < 26) << 5;
        return bcp + ((!flag && (bcp - 65 < 26)) << 5);
    }

    // Main decode
    this.decode=function(input,preserveCase) {
        // Dont use uft16
        var output=[];
        var case_flags=[];
        var input_length = input.length;

        var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len;

        // Initialize the state: 

        n = initial_n;
        i = 0;
        bias = initial_bias;

        // Handle the basic code points:  Let basic be the number of input code 
        // points before the last delimiter, or 0 if there is none, then    
        // copy the first basic code points to the output.                      

        basic = input.lastIndexOf(delimiter);
        if (basic < 0) basic = 0;

        for (j = 0;  j < basic;  ++j) {
                if(preserveCase) case_flags[output.length] = ( input.charCodeAt(j) -65 < 26);
                if ( input.charCodeAt(j) >= 0x80) {
                        throw new RangeError("Illegal input >= 0x80");
                }
                output.push( input.charCodeAt(j) );
        }

        // Main decoding loop:  Start just after the last delimiter if any  
        // basic code points were copied; start at the beginning otherwise. 

        for (ic = basic > 0 ? basic + 1 : 0;  ic < input_length; ) {

                // ic is the index of the next character to be consumed,

                // Decode a generalized variable-length integer into delta,  
                // which gets added to i.  The overflow checking is easier   
                // if we increase i as we go, then subtract off its starting 
                // value at the end to obtain delta.
                for (oldi = i, w = 1, k = base;  ;  k += base) {
                        if (ic >= input_length) {
                                throw RangeError ("punycode_bad_input(1)");
                        }
                        digit = decode_digit(input.charCodeAt(ic++));

                        if (digit >= base) {
                                throw RangeError("punycode_bad_input(2)");
                        }
                        if (digit > Math.floor((maxint - i) / w)) {
                                throw RangeError ("punycode_overflow(1)");
                        }
                        i += digit * w;
                        t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
                        if (digit < t) { break; }
                        if (w > Math.floor(maxint / (base - t))) {
                                throw RangeError("punycode_overflow(2)");
                        }
                        w *= (base - t);
                }

                out = output.length + 1;
                bias = adapt(i - oldi, out, oldi === 0);

                // i was supposed to wrap around from out to 0,   
                // incrementing n each time, so we'll fix that now: 
                if ( Math.floor(i / out) > maxint - n) {
                        throw RangeError("punycode_overflow(3)");
                }
                n += Math.floor( i / out ) ;
                i %= out;

                // Insert n at position i of the output: 
                // Case of last character determines uppercase flag: 
                if (preserveCase) { case_flags.splice(i, 0, input.charCodeAt(ic -1)  -65 < 26);}

                output.splice(i, 0, n);
                i++;
        }
        if (preserveCase) {
                for (i = 0, len = output.length; i < len; i++) {
                        if (case_flags[i]) {
                                output[i] = (String.fromCharCode(output[i]).toUpperCase()).charCodeAt(0);
                        }
                }
        }
        return utf16.encode(output);            
    };

    //** Main encode function **

    this.encode = function (input,preserveCase) {
        //** Bias adaptation function **

        var n, delta, h, b, bias, j, m, q, k, t, ijv, case_flags;

        if (preserveCase) {
                // Preserve case, step1 of 2: Get a list of the unaltered string
                case_flags = utf16.decode(input);
        }
        // Converts the input in UTF-16 to Unicode
        input = utf16.decode(input.toLowerCase());
        //input = utf16.decode(input);

        var input_length = input.length; // Cache the length

        if (preserveCase) {
                // Preserve case, step2 of 2: Modify the list to true/false
                for (j=0; j < input_length; j++) {
                        case_flags[j] = input[j] != case_flags[j];
                }
                }

        var output=[];


        // Initialize the state: 
        n = initial_n;
        delta = 0;
        bias = initial_bias;

        // Handle the basic code points: 
        for (j = 0;  j < input_length;  ++j) {
                if ( input[j] < 0x80) {
                        output.push(
                                String.fromCharCode(
                                        case_flags ? encode_basic(input[j], case_flags[j]) : input[j]
                                )
                        );
                }
        }

        h = b = output.length;

        // h is the number of code points that have been handled, b is the  
        // number of basic code points 

        if (b > 0) output.push(delimiter);

        // Main encoding loop: 
        //
        while (h < input_length) {
                // All non-basic code points < n have been     
                // handled already. Find the next larger one: 

                for (m = maxint, j = 0;  j < input_length;  ++j) {
                        ijv = input[j];
                        if (ijv >= n && ijv < m) m = ijv;
                }

                // Increase delta enough to advance the decoder's    
                // <n,i> state to <m,0>, but guard against overflow: 

                if (m - n > Math.floor((maxint - delta) / (h + 1))) {
                        throw RangeError("punycode_overflow (1)");
                }
                delta += (m - n) * (h + 1);
                n = m;

                for (j = 0;  j < input_length;  ++j) {
                        ijv = input[j];

                        if (ijv < n ) {
                                if (++delta > maxint) return Error("punycode_overflow(2)");
                        }

                        if (ijv == n) {
                                // Represent delta as a generalized variable-length integer: 
                                for (q = delta, k = base;  ;  k += base) {
                                        t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
                                        if (q < t) break;
                                        output.push( String.fromCharCode(encode_digit(t + (q - t) % (base - t), 0)) );
                                        q = Math.floor( (q - t) / (base - t) );
                                }
                                output.push( String.fromCharCode(encode_digit(q, preserveCase && case_flags[j] ? 1:0 )));
                                bias = adapt(delta, h + 1, h == b);
                                delta = 0;
                                ++h;
                        }
                }

                ++delta, ++n;
        }
        return output.join("");
    }
}();