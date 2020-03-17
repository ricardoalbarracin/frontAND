import { WordLimitPipe } from './word-limit.pipe';

describe('WordLimitPipe', () => {
  const palabraCorta = "Agencia nacional digital";
  const palabraLarga = "Agencia nacional digital de Colombia";
  const pipe = new WordLimitPipe();

  it('create an instance', () => {    
    expect(pipe).toBeTruthy();
  });

  it('Deberá recortar las palabras', () => {
    expect(pipe.transform(palabraLarga, 3)).toBe("Agencia nacional digital...");
  });

  it('No deberá recortar palabras', () => {
    expect(pipe.transform(palabraCorta, 3)).toBe("Agencia nacional digital");
  });
});
