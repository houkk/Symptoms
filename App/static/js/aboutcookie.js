/**
 * Created by Mesogene on 6/9/15.
 */
function GetCookie (cook)
{
    var name = cook;
    var arg = name + "=";
    var alen = arg.length;
    var clen = window.document.cookie.length;
    var i = 0;
    while (i < clen)
    {
        var j = i + alen;
        if (window.document.cookie.substring(i, j) == arg) return getCookieVal (j);
        i = window.document.cookie.indexOf(" ", i) + 1;
        if (i == 0)
            break;
    }
    //return null;
}
function getCookieVal (offset)
{
    var endstr = window.document.cookie.indexOf (";", offset);
    if (endstr == -1)
        endstr = window.document.cookie.length;
    return unescape(window.document.cookie.substring(offset, endstr));
}
function SetCookie (value)
{
    var name = 'cnda';
    var exp = new Date();
    //exp.setTime(exp.getTime() + (10*24*60*60*1000));
    window.document.cookie = name + "=" + escape (value) +";path=/";// + "; expires="+ exp.toGMTString()
}
function DeleteCookie ()
{
    var name = 'cnda';
    var exp = new Date();
    exp.setTime (exp.getTime() - 100);
    var cval = GetCookie (name);
    window.document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString()+";path=/";
}