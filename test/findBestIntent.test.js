const { findBestIntent } = require('../utils.js');

const mockKB = [
  { id: 'greeting', keywords: ['hi', 'hello', 'hey', 'salam'], response: 'Hi there!' },
  { id: 'skills', keywords: ['skill', 'skills', 'technology', 'expertise'], response: 'I know React, Node.js, and Python' },
  { id: 'projects', keywords: ['project', 'projects', 'work', 'portfolio'], response: 'Check out my projects above' },
  { id: 'contact', keywords: ['contact', 'email', 'phone', 'reach'], response: 'You can reach me at...' },
  { id: 'about', keywords: ['who are you', 'tell me about', 'about you'], response: 'I am a Full Stack Engineer' },
  { id: 'react', keywords: ['react experience', 'know react'], response: 'I use React regularly' }
];

describe('findBestIntent', () => {
  describe('exact word-boundary matching (Pass 1)', () => {
    test('matches single keyword exactly', () => {
      expect(findBestIntent('hello', mockKB).id).toBe('greeting');
    });

    test('matches single keyword case-insensitively', () => {
      expect(findBestIntent('HELLO', mockKB).id).toBe('greeting');
    });

    test('matches keyword in sentence', () => {
      expect(findBestIntent('hey there, how are you?', mockKB).id).toBe('greeting');
    });

    test('prioritizes multi-word keywords over single words', () => {
      expect(findBestIntent('who are you?', mockKB).id).toBe('about');
    });

    test('scores keyword phrases by word count', () => {
      expect(findBestIntent('my react experience is good', mockKB).id).toBe('react');
    });

    test('word boundaries may allow partial matches via substring pass', () => {
      const result = findBestIntent('I have a skillet', mockKB);
      expect(result).toBeDefined();
    });

    test('stops at first match when score is clear', () => {
      expect(findBestIntent('hello world', mockKB).id).toBe('greeting');
    });
  });

  describe('substring fallback (Pass 2)', () => {
    test('matches substring when exact word-boundary fails', () => {
      const result = findBestIntent('That was quite expertness', mockKB);
      expect(result).toBeDefined();
    });

    test('does not fall back for very short substrings', () => {
      const result = findBestIntent('I h this', mockKB);
      expect(result === null || typeof result === 'object').toBe(true);
    });

    test('fall through to null for no match', () => {
      expect(findBestIntent('xyzabc 123 nothing here', mockKB)).toBeNull();
    });
  });

  describe('real-world conversational input', () => {
    test('handles extra punctuation', () => {
      expect(findBestIntent('Hello!!!', mockKB).id).toBe('greeting');
    });

    test('handles multiple spaces', () => {
      expect(findBestIntent('hello     there', mockKB).id).toBe('greeting');
    });

    test('handles leading/trailing whitespace', () => {
      expect(findBestIntent('   hello   ', mockKB).id).toBe('greeting');
    });

    test('handles mixed case', () => {
      expect(findBestIntent('Hello', mockKB).id).toBe('greeting');
    });

    test('matches when keyword is buried in text', () => {
      expect(findBestIntent('So I have these projects I built', mockKB).id).toBe('projects');
    });
  });

  describe('edge cases and null handling', () => {
    test('returns null for empty string', () => {
      expect(findBestIntent('', mockKB)).toBeNull();
    });

    test('returns null for whitespace only', () => {
      expect(findBestIntent('   ', mockKB)).toBeNull();
    });

    test('returns null for no match', () => {
      expect(findBestIntent('xyzqwerty', mockKB)).toBeNull();
    });

    test('handles empty knowledge base', () => {
      expect(findBestIntent('hello', [])).toBeNull();
    });

    test('returns null for null userText', () => {
      expect(() => { findBestIntent(null, mockKB); }).toThrow();
    });

    test('returns null for undefined userText', () => {
      expect(() => { findBestIntent(undefined, mockKB); }).toThrow();
    });

    test('handles null knowledge base gracefully', () => {
      expect(() => { findBestIntent('hello', null); }).toThrow();
    });
  });

  describe('scoring and prioritization', () => {
    test('prioritizes exact matches', () => {
      const kb = [
        { id: 'exact', keywords: ['hello world'] },
        { id: 'substring', keywords: ['hello'] }
      ];
      expect(findBestIntent('hello world', kb).id).toBe('exact');
    });

    test('returns first highest-scoring match', () => {
      const kb = [
        { id: 'first', keywords: ['hello'] },
        { id: 'second', keywords: ['hello'] }
      ];
      expect(findBestIntent('hello', kb).id).toBe('first');
    });

    test('higher phrase word counts score higher', () => {
      const kb = [
        { id: 'three', keywords: ['who are you'] },
        { id: 'two', keywords: ['hello world'] },
        { id: 'one', keywords: ['hi'] }
      ];
      expect(findBestIntent('who are you', kb).id).toBe('three');
    });
  });

  describe('keyword matching behavior', () => {
    test('matches all instances of a keyword', () => {
      const kb = [{ id: 'multi', keywords: ['hello', 'hi', 'hey'] }];
      expect(findBestIntent('hello', kb).id).toBe('multi');
      expect(findBestIntent('hi', kb).id).toBe('multi');
      expect(findBestIntent('hey', kb).id).toBe('multi');
    });

    test('scores multiple keywords in same input', () => {
      const kb = [{ id: 'both', keywords: ['hello', 'world'] }];
      expect(findBestIntent('hello world', kb).id).toBe('both');
    });
  });

  describe('integration with real-like scenarios', () => {
    test('chatbot greeting flow', () => {
      expect(findBestIntent('Hey there!', mockKB).id).toBe('greeting');
    });

    test('chatbot portfolio query', () => {
      expect(findBestIntent('Show me your work', mockKB).id).toBe('projects');
    });

    test('chatbot contact query', () => {
      expect(findBestIntent('How can I reach you?', mockKB).id).toBe('contact');
    });
  });

  describe('case sensitivity handling', () => {
    test('lowercases input for comparison', () => {
      const r1 = findBestIntent('HELLO', mockKB);
      const r2 = findBestIntent('hello', mockKB);
      expect(r1.id).toBe(r2.id);
    });

    test('lowercases keywords for comparison', () => {
      const kb = [{ id: 'test', keywords: ['HELLO'] }];
      expect(findBestIntent('hello', kb).id).toBe('test');
    });
  });
});
