// Import the function you want to test
const { parseMessage } = require('./server.ts');

describe('parseMessage', () => {
  it('should correctly parse a valid JSON message', () => {
    // Mock msg.toString() to return a valid JSON string
    const mockMsgToString = jest.fn(() => '{"key": "value"}');
    const msg = { toString: mockMsgToString };

    const result = parseMessage(msg);

    // Expect that the result matches the expected parsed JSON
    expect(result).toEqual({ key: 'value' });
    // Expect that msg.toString() was called once
    expect(mockMsgToString).toHaveBeenCalledTimes(1);
  });

  it('should correctly handle and fix a JSON message with an extra "}"', () => {
    // Mock msg.toString() to return a JSON string with an extra "}"
    const mockMsgToString = jest.fn(() => '{"key": "value"}}');
    const msg = { toString: mockMsgToString };

    const result = parseMessage(msg);

    // Expect that the result matches the expected parsed JSON
    expect(result).toEqual({ key: 'value' });
    // Expect that msg.toString() was called once
    expect(mockMsgToString).toHaveBeenCalledTimes(1);
  });

  it('should throw an error for an invalid JSON message', () => {
    // Mock msg.toString() to return an invalid JSON string
    const mockMsgToString = jest.fn(() => 'invalid-json');
    const msg = { toString: mockMsgToString };

    // Expect that parseMessage to throw a SyntaxError
    expect(() => parseMessage(msg)).toThrow(SyntaxError);
    // Expect that msg.toString() was called once
    expect(mockMsgToString).toHaveBeenCalledTimes(1);
  });
});
