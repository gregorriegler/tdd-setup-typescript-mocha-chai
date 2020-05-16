import {expect} from "chai";

describe('oddWords', function () {
    it('world', function () {
        type Input = {
            read: () => string
        }

        type Output = {
            write: (char: string) => void
            get: () => string;
        }

        function createInput(text: string): Input {
            let index = 0
            return {
                read: (): string => {
                    return text.charAt(index++)
                }
            }
        }

        function createOutput(): Output {
            let text: string = ""
            return {
                write: (char: string) => {
                    text += char
                },
                get: (): string => {
                    return text
                }
            }
        }

        function endOfSentence(char: string) {
            return char == '.';
        }

        function endOfWord(char: string) {
            return endOfSentence(char) || char == ' ';
        }

        function reverseWord(input: Input, output: Output, depth: number): string {
            let char = input.read()
            if (endOfWord(char)) {
                if(depth == 0) return ''
                return char;
            }
            let finalChar: string = reverseWord(input, output, ++depth);
            output.write(char)
            return finalChar
        }

        function straightWord(input: Input, output: Output, depth: number): string {
            let char = input.read()
            if (endOfWord(char)) {
                if(depth == 0) return ''
                return char;
            }
            output.write(char)
            return straightWord(input, output, ++depth)
        }

        function oddWords(text: string) {
            let input = createInput(text)
            let output = createOutput()

            for (let i = 0, char = ''; !endOfSentence(char);) {

                if (i % 2 == 1) {
                    char = reverseWord(input, output, 0);
                } else {
                    char = straightWord(input, output, 0);
                }

                if(char != '') i++
                output.write(char)
            }

            return output.get()
        }

        expect(oddWords("ab.")).to.equal("ab.")
        expect(oddWords("abc cde.")).to.equal("abc edc.")
        expect(oddWords("abc   cde.")).to.equal("abc edc.")
    });
});