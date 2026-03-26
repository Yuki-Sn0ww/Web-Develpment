export default async function Page({ params }) {
    throw new console.error("mai hu bug");
    
  const { slug } = await params;
  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "Go",
    "Rust",
    "Kotlin",
    "Swift",
    "TypeScript",
    "PHP",
    "Ruby",
    "Dart",
    "R",
  ];

  if(languages.includes(slug)) {
return <div>My Post: {slug}</div>;
  }
  else {
    return <div>not found</div>
  }
  
}
