const { detectVisitorName } = require('../utils.js');

describe('detectVisitorName', () => {
  describe('valid name detection', () => {
    test('detects "my name is" pattern', () => {
      expect(detectVisitorName('my name is John')).toBe('John');
      expect(detectVisitorName('My name is Alice')).toBe('Alice');
    });

    test('detects "call me" pattern', () => {
      expect(detectVisitorName('call me Bob')).toBe('Bob');
      expect(detectVisitorName('Call me Sarah')).toBe('Sarah');
    });

    test('detects "this is" pattern', () => {
      expect(detectVisitorName('this is Mike')).toBe('Mike');
      expect(detectVisitorName('This is Emma')).toBe('Emma');
    });

    test('extracts full names with spaces', () => {
      expect(detectVisitorName('my name is John Smith')).toBe('John Smith');
      expect(detectVisitorName('call me Mary Jane')).toBe('Mary Jane');
    });

    test('handles names with different cases', () => {
      expect(detectVisitorName('my name is john')).toBe('John');
      expect(detectVisitorName('MY NAME IS ALICE')).toBe('Alice');
      expect(detectVisitorName('call me bOB')).toBe('Bob');
    });

    test('case-insensitive pattern matching', () => {
      expect(detectVisitorName('MY NAME IS John')).toBe('John');
      expect(detectVisitorName('CALL ME Sarah')).toBe('Sarah');
      expect(detectVisitorName('THIS IS Mike')).toBe('Mike');
    });

    test('handles extra whitespace around pattern', () => {
      expect(detectVisitorName('  my name is John  ')).toBe('John');
      expect(detectVisitorName('call me  Bob')).toBe('Bob');
    });

    test('handles names in sentences', () => {
      const result = detectVisitorName('Hey, my name is Rachel and I have a question');
      expect(result).toBeTruthy();
      expect(result.startsWith('Rachel')).toBe(true);
    });

    test('handles ASCII-only names', () => {
      expect(detectVisitorName('my name is David')).toBe('David');
    });
  });

  describe('guard against false positives', () => {
    test('rejects articles as names', () => {
      expect(detectVisitorName('my name is a')).toBeNull();
      expect(detectVisitorName('my name is an')).toBeNull();
      expect(detectVisitorName('call me the')).toBeNull();
    });

    test('rejects common words as names', () => {
      expect(detectVisitorName('my name is not')).toBeNull();
      expect(detectVisitorName('call me just')).toBeNull();
      expect(detectVisitorName('this is here')).toBeNull();
    });

    test('rejects positive adjectives as names', () => {
      expect(detectVisitorName('my name is good')).toBeNull();
      expect(detectVisitorName('call me fine')).toBeNull();
      expect(detectVisitorName('this is great')).toBeNull();
      expect(detectVisitorName('my name is nice')).toBeNull();
      expect(detectVisitorName('call me cool')).toBeNull();
    });

    test('rejects okay/ok as names', () => {
      expect(detectVisitorName('my name is ok')).toBeNull();
      expect(detectVisitorName('call me okay')).toBeNull();
    });
  });

  describe('invalid input handling', () => {
    test('returns null when pattern not found', () => {
      expect(detectVisitorName('Hello there')).toBeNull();
      expect(detectVisitorName('I am John')).toBeNull();
      expect(detectVisitorName('Just call me')).toBeNull();
    });

    test('returns null for empty string', () => {
      expect(detectVisitorName('')).toBeNull();
    });

    test('returns null for whitespace only', () => {
      expect(detectVisitorName('   ')).toBeNull();
      expect(detectVisitorName('\t\n')).toBeNull();
    });

    test('returns null when name part is missing', () => {
      expect(detectVisitorName('my name is ')).toBeNull();
      expect(detectVisitorName('call me')).toBeNull();
    });

    test('regex requires at least 2 characters per name part', () => {
      expect(detectVisitorName('my name is X')).toBeNull();
    });

    test('returns null for invalid name format', () => {
      expect(detectVisitorName('my name is 123')).toBeNull();
    });
  });

  describe('edge cases and special scenarios', () => {
    test('handles names at the end of input', () => {
      expect(detectVisitorName('my name is John')).toBe('John');
    });

    test('stops at punctuation (word boundary)', () => {
      expect(detectVisitorName('my name is John.')).toBe('John');
      expect(detectVisitorName('my name is Alice!')).toBe('Alice');
    });

    test('title case in result', () => {
      expect(detectVisitorName('my name is mArY')).toBe('Mary');
      expect(detectVisitorName('call me jOhN sOlomon')).toBe('John Solomon');
    });

    test('regex allows up to 18 characters per word', () => {
      const valid18 = 'my name is ' + 'a'.repeat(18);
      expect(detectVisitorName(valid18)).toBe('A' + 'a'.repeat(17));
    });

    test('non-ASCII characters may not match', () => {
      const result = detectVisitorName('my name is Jos\u00e9');
      expect(result === null || !result.includes('\u00e9')).toBe(true);
    });

    test('hyphens break name capture', () => {
      const result = detectVisitorName('my name is Mary-Jane');
      expect(result).toBe('Mary');
    });

    test('multiple spaces between pattern and name', () => {
      expect(detectVisitorName('my name is  John')).toBe('John');
      expect(detectVisitorName('call me   Sarah')).toBe('Sarah');
    });

    test('real-world chat samples', () => {
      expect(detectVisitorName('Hi! My name is Emma, nice to chat')).toBe('Emma');
      expect(detectVisitorName('call me Alex, I have a question')).toBe('Alex');
      expect(detectVisitorName('This is Marcus. I wanted to know...')).toBe('Marcus');
    });
  });

  describe('input type handling', () => {
    test('handles various string inputs', () => {
      expect(detectVisitorName('my name is Smith')).toBe('Smith');
    });

    test('trims input properly', () => {
      expect(detectVisitorName('  my name is John  ')).toBe('John');
    });
  });
});
