const { rot13, obfuscateContact, deobfuscateContact } = require('../utils.js');

describe('Contact Information Obfuscation', () => {
  const plainEmail = 'Ahmadaslam0904@gmail.com';
  const plainPhone = '+92 3250444285';
  const obfuscatedEmail = 'Nuznqnfynz0904@tznvy.pbz';

  describe('rot13 encoding/decoding', () => {
    test('encodes plain email to obfuscated form', () => {
      expect(rot13(plainEmail)).toBe(obfuscatedEmail);
    });

    test('decodes obfuscated email back to plain', () => {
      expect(rot13(obfuscatedEmail)).toBe(plainEmail);
    });

    test('rot13 is symmetric', () => {
      expect(rot13(rot13(plainEmail))).toBe(plainEmail);
    });

    test('preserves non-alphabetic characters', () => {
      const email = 'test+tag@example.com';
      expect(rot13(rot13(email))).toBe(email);
    });

    test('handles phone numbers unchanged', () => {
      expect(rot13('+92 3250444285')).toBe('+92 3250444285');
    });

    test('handles mixed content round-trip', () => {
      const text = 'Email: Ahmadaslam0904@gmail.com Phone: +92 3250444285';
      expect(rot13(rot13(text))).toBe(text);
    });

    test('uppercase and lowercase encoded separately', () => {
      expect(rot13('A')).toBe('N');
      expect(rot13('a')).toBe('n');
    });

    test('handles empty string', () => {
      expect(rot13('')).toBe('');
    });

    test('handles special email characters round-trip', () => {
      const email = 'test.user+tag@sub.domain.co.uk';
      expect(rot13(rot13(email))).toBe(email);
    });
  });

  describe('obfuscateContact function', () => {
    test('returns object with obfuscated email and phone', () => {
      const result = obfuscateContact(plainEmail, plainPhone);
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('phone');
      expect(result.email).toBe(obfuscatedEmail);
    });

    test('obfuscated email is different from plain', () => {
      const result = obfuscateContact(plainEmail, plainPhone);
      expect(result.email).not.toBe(plainEmail);
    });

    test('returns a new object each time', () => {
      const result1 = obfuscateContact(plainEmail, plainPhone);
      const result2 = obfuscateContact(plainEmail, plainPhone);
      expect(result1).not.toBe(result2);
      expect(result1.email).toBe(result2.email);
    });
  });

  describe('deobfuscateContact function', () => {
    test('returns object with deobfuscated email and phone', () => {
      const result = deobfuscateContact(obfuscatedEmail, plainPhone);
      expect(result.email).toBe(plainEmail);
    });

    test('round-trip preserves original', () => {
      const obfuscated = obfuscateContact(plainEmail, plainPhone);
      const deobfuscated = deobfuscateContact(obfuscated.email, obfuscated.phone);
      expect(deobfuscated.email).toBe(plainEmail);
      expect(deobfuscated.phone).toBe(plainPhone);
    });
  });

  describe('practical use case', () => {
    test('simulates storage and runtime decode', () => {
      const storedObfuscated = 'Nuznqnfynz0904@tznvy.pbz';
      const decodedEmail = rot13(storedObfuscated);
      expect(decodedEmail).toBe('Ahmadaslam0904@gmail.com');
      expect(decodedEmail).toMatch(/@gmail\.com$/);
    });

    test('scraper sees obfuscated version in page source', () => {
      const pageSource = "email: 'Nuznqnfynz0904@tznvy.pbz'";
      expect(pageSource).toContain('Nuznqnfynz0904@tznvy.pbz');
      expect(pageSource).not.toContain('Ahmadaslam0904@gmail.com');
    });

    test('browser decodes email at runtime', () => {
      const displayed = rot13('Nuznqnfynz0904@tznvy.pbz');
      expect(displayed).toBe('Ahmadaslam0904@gmail.com');
    });
  });

  describe('security considerations', () => {
    test('rot13 is intentionally not cryptographic', () => {
      expect(rot13(obfuscatedEmail)).toBe(plainEmail);
    });

    test('obfuscated email is not the real email', () => {
      const obfuscated = rot13(plainEmail);
      expect(obfuscated).not.toBe(plainEmail);
    });
  });
});
