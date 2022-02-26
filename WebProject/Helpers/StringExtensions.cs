using System;
using System.Security.Cryptography;
using System.Text;

namespace Backend.Helpers;

public static class StringExtensions
{
    public static string Encrypt(this string entry)
    {
        var bytes = Encoding.UTF8.GetBytes(entry);
        using var sha = SHA256.Create();
        var passwordBytes = sha.ComputeHash(bytes);
        var encryptedResult = Convert.ToBase64String(passwordBytes);
        return encryptedResult;
    }
}