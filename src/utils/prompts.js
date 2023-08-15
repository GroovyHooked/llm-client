export const prompts = {
  javascript: [
    {
      title: "Comprehend",
      content:
        "I am unable to understand the given code, Explain each variable, function, and logic in the given code in detail. Code: [paste your code here]",
    },
    {
      title: "Better code",
      content:
        "Act like an experienced JavaScript programmer. Improve the code quality of the given code; it should be readable, reusable, scalable, and secure. Code: [paste your code here]",
    },
    {
      title: "Fix issues",
      content:
        "I am getting the error message [paste your error message or explain the issue]. Explain the issue in the short and tell me how to fix it with updated code and steps.",
    },
    {
      title: "Comments",
      content:
        "Write a short and easy-to-understand comment for the given code. Code: [paste your code]",
    },
    {
      title: "Review",
      content: "Review my code and suggest any improvements or optimizations: [paste your code here]"
    }
  ],
  other: [
    {
      title: "Playlist",
      content: "Je veux que vous agissiez comme un recommandeur de chansons. Je vous fournirai une chanson et vous créerez une liste de lecture de 10 chansons qui sont similaires à la chanson donnée. Et vous fournirez un nom de liste de lecture et une description pour la liste de lecture. Ne choisissez pas des chansons qui ont le même nom ou le même artiste. N’écrivez pas d’explications ou d’autres mots, répondez simplement avec le nom de la liste de lecture, la description et les chansons. Ma première chanson est « [ titre ] ».",
    },
    {
      title: "Lorem",
      content: "Lorem ipsum",
    },
  ],
};
