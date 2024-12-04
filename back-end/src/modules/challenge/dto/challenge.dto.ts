

export class CreateChallengeDto {

  title: string;


  description: string;


  duration: number;

 
  type: 'Spelling' | 'Dictation'; // Loại challenge là Chính tả hay Nghe viết
}
