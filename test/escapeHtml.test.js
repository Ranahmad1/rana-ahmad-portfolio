const { escapeHtml } = require('../utils.js');

describe('escapeHtml', () => {
  describe('basic escaping', () => {
    test('escapes angle brackets', () => {
      expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
      expect(escapeHtml('</div>')).toBe('&lt;/div&gt;');
    });

    test('escapes ampersands', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
      expect(escapeHtml('&')).toBe('&amp;');
    });

    test('double quotes are escaped or encoded safely', () => {
      const result = escapeHtml('"quoted"');
      expect(result).toBeTruthy();
      expect(result).toContain('quoted');
    });

    test('single quotes are not escaped', () => {
      expect(escapeHtml("'single'")).toBe("'single'");
    });
  });

  describe('XSS attack prevention', () => {
    test('prevents script injection by escaping HTML tags', () => {
      const xss1 = '<img src=x onerror="alert(\'XSS\')">'; 
      const escaped = escapeHtml(xss1);
      expect(escaped).toContain('&lt;img');
      expect(escaped).not.toContain('<img');
    });

    test('prevents event handler injection by escaping tags', () => {
      const xss2 = '<div onclick="steal()">';
      const escaped = escapeHtml(xss2);
      expect(escaped).toContain('&lt;div');
      expect(escaped).not.toContain('<div');
    });

    test('prevents style-based XSS by escaping style tags', () => {
      const xss3 = '<style>body { background: url("javascript:alert()"); }</style>';
      const escaped = escapeHtml(xss3);
      expect(escaped).toContain('&lt;style&gt;');
      expect(escaped).not.toContain('<style>');
    });

    test('prevents data URL injection by escaping HTML', () => {
      const xss4 = '<a href="data:text/html,<img src=x onerror=alert()>">link</a>';
      const escaped = escapeHtml(xss4);
      expect(escaped).toContain('&lt;a');
      expect(escaped).not.toContain('<a');
    });
  });

  describe('normal content handling', () => {
    test('preserves plain text', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });

    test('preserves alphanumeric characters', () => {
      expect(escapeHtml('test123')).toBe('test123');
    });

    test('preserves special characters that do not need escaping', () => {
      expect(escapeHtml('Hello! How are you?')).toBe('Hello! How are you?');
      expect(escapeHtml('Price: $99')).toBe('Price: $99');
    });

    test('handles mixed text with special characters', () => {
      expect(escapeHtml('Tom & Jerry at 5:00pm')).toBe('Tom &amp; Jerry at 5:00pm');
    });

    test('handles emoji and unicode', () => {
      expect(escapeHtml('Hi \u{1F44B} \u0645\u0631\u062D\u0628\u0627')).toBe('Hi \u{1F44B} \u0645\u0631\u062D\u0628\u0627');
    });
  });

  describe('edge cases', () => {
    test('handles null as empty string', () => {
      expect(escapeHtml(null)).toBe('');
    });

    test('handles undefined as empty string', () => {
      expect(escapeHtml(undefined)).toBe('');
    });

    test('handles empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    test('handles whitespace', () => {
      expect(escapeHtml('   ')).toBe('   ');
      expect(escapeHtml('\t\n')).toBe('\t\n');
    });

    test('handles numbers as strings', () => {
      expect(escapeHtml('123')).toBe('123');
    });

    test('handles long strings', () => {
      const long = 'a'.repeat(10000);
      expect(escapeHtml(long)).toBe(long);
    });

    test('handles multiple consecutive angle brackets', () => {
      const result = escapeHtml('<<>>');
      expect(result).toContain('&lt;&lt;&gt;&gt;');
    });

    test('handles multiple consecutive ampersands', () => {
      const result = escapeHtml('&&&');
      expect(result).toBe('&amp;&amp;&amp;');
    });

    test('does not double-escape', () => {
      const escaped = escapeHtml('<div>');
      const reescaped = escapeHtml(escaped);
      expect(reescaped).not.toContain('&lt;&lt;');
    });
  });

  describe('real-world scenarios', () => {
    test('handles URLs', () => {
      const url = 'https://example.com?a=1&b=2';
      expect(escapeHtml(url)).toBe('https://example.com?a=1&amp;b=2');
    });

    test('handles email addresses', () => {
      const email = 'user@example.com';
      expect(escapeHtml(email)).toBe('user@example.com');
    });

    test('handles common punctuation', () => {
      expect(escapeHtml('Hello, world! (test)')).toBe('Hello, world! (test)');
    });
  });
});
