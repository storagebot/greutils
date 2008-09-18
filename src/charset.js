/**
 * A set of utility functions for character set conversions.
 * 
 * @public
 * @name GREUtils.Charset
 * @namespace GREUtils.Charset
 */
GREUtils.define('GREUtils.Charset');

/**
 * Converts a string to Unicode.
 *
 * This method takes a string encoded in the character "charset", and returns the corresponding string encoded in Unicode.
 * If "charset" is not given then string is assumed to be encoded in "UTF-8". 
 *  
 * @public
 * @static
 * @function
 * @param {String} text         This is the string to convert to Unicode
 * @param {String} charset      This is the character set the string is encoded in. 
 * @return {String}             The string encoded in Unicode if conversion succeeds; otherwise the original string is returned
 */
GREUtils.Charset.convertToUnicode = function(text, charset) {
	
    try {
        var conv = GREUtils.XPCOM.getService("@mozilla.org/intl/scriptableunicodeconverter", "nsIScriptableUnicodeConverter");
        conv.charset = charset ? charset : "UTF-8";
        return conv.ConvertToUnicode(text);
    }catch (ex) {
		GREUtils.log('[Error] GREUtils.Charset.convertToUnicode: ' + ex.message);
        return text;
    }
	
};

/**
 * Converts a Unicode string to the given character set encoding.
 *
 * This method takes a string encoded in Unicode, and returns the corresponding string encoded in "charset".
 * If "charset" is not given then the string will be converted to "UTF-8".
 *  
 * @public
 * @static
 * @function
 * @param {String} text         This is the Unicode string to convert
 * @param {String} charset      This is the character set encoding to convert to
 * @return {String}             The string encoded in "charset" if conversion succeeds; otherwise the original string is returned
 */
GREUtils.Charset.convertFromUnicode = function(text, charset) {
    try {
        var conv = GREUtils.XPCOM.getService("@mozilla.org/intl/scriptableunicodeconverter", "nsIScriptableUnicodeConverter");
        conv.charset = charset ? charset : "UTF-8";
        return conv.ConvertFromUnicode(text);
    }catch (ex) {
		GREUtils.log('[Error] GREUtils.Charset.convertFromUnicode: '+ex.message);
        return text;
    }
};


/**
 * Converts a string from one character set encoding to another.
 * 
 * This method takes a string encoded in character set "in_charset"
 * and returns the corresponding string encoded in character set "out_charset".
 *
 * @public
 * @static
 * @function
 * @param {String} text         This is the string to convert
 * @param {String} in_charset   This is the character set used to encode the string
 * @param {String} out_charset  This is the character set encoding the string is to be converted to
 * @return {String}             A string encoded using the given character set "out_charset" if conversion succeeds; otherwise the original string is returned
 */
GREUtils.Charset.convertCharset = function (text, in_charset, out_charset) {
    return this.convertFromUnicode(this.convertToUnicode(text, in_charset), out_charset);
};
