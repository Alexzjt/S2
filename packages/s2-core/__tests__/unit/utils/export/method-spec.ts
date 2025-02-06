import {
  convertString,
  escapeCSVField,
  keyEqualTo,
  trimTabSeparator,
} from '../../../../src/utils/export/method';

describe('method test', () => {
  test('#keyEqualTo', () => {
    expect(keyEqualTo('a', 'a')).toBeTruthy();
    expect(keyEqualTo('a', 'b')).toBeFalsy();
    expect(keyEqualTo('a', '')).toBeFalsy();
    expect(keyEqualTo('A', 'a')).toBeTruthy();
  });

  test('#convertString', () => {
    expect(convertString('a')).toBe('a');
    expect(convertString('a\nb')).toBe('"a\nb"');
    expect(convertString('a\nb"c')).toBe('"a\nb\'c"');
    expect(convertString(null)).toBe(null);
  });

  test('#trimTabSeparator', () => {
    expect(trimTabSeparator('a\tb')).toBe('ab');
    expect(trimTabSeparator('a\tb\t')).toBe('ab');
    expect(trimTabSeparator('')).toBe('');
    expect(trimTabSeparator('a')).toBe('a');
    expect(trimTabSeparator('\ta')).toBe('a');
    expect(trimTabSeparator(null as unknown as string)).toBe(null);
    expect(trimTabSeparator(1 as unknown as string)).toBe(1);
  });
});

type SimpleData = string | number | null | undefined;
describe('escapeCSVField', () => {
  it('should return the same value for non-string types', () => {
    const testData: SimpleData[] = [42, null, undefined];

    testData.forEach((input) => {
      expect(escapeCSVField(input)).toBe(input);
    });
  });

  it('should return the same string if no special characters are present', () => {
    const testStrings = ['hello', '123', 'test'];

    testStrings.forEach((str) => {
      expect(escapeCSVField(str)).toBe(str);
    });
  });

  it('should escape double quotes by replacing with two double quotes', () => {
    const input = 'hello "world"';
    const expected = '"hello ""world"""';

    expect(escapeCSVField(input)).toBe(expected);
  });

  it('should wrap strings containing commas in double quotes', () => {
    const input = 'hello,world';
    const expected = '"hello,world"';

    expect(escapeCSVField(input)).toBe(expected);
  });

  it('should wrap strings containing newlines in double quotes', () => {
    const input = 'hello\nworld';
    const expected = '"hello\nworld"';

    expect(escapeCSVField(input)).toBe(expected);
  });

  it('should wrap strings containing tabs in double quotes', () => {
    const input = 'hello\tworld';
    const expected = '"hello\tworld"';

    expect(escapeCSVField(input)).toBe(expected);
  });
});
