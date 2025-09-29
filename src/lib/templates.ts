export type Template = {
  id: string;
  name: string;
  content: string;
};

export const templates: Template[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <style>
    body { font-family: sans-serif; margin: 0; padding: 0; line-height: 1.6; }
    .container { max-width: 960px; margin: auto; padding: 2rem; }
    .hero { text-align: center; padding: 4rem 1rem; background: #f4f4f4; }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.2rem; color: #555; }
    .button { display: inline-block; background: #333; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 1rem;}
  </style>
</head>
<body>
  <header class="container">
    <nav>
      <p style="font-weight: bold; font-size: 1.5rem;">MyApp</p>
    </nav>
  </header>
  <main>
    <section class="hero">
      <h1>Welcome to Our Awesome Service</h1>
      <p>The best solution for your needs. Join us now!</p>
      <a href="#" class="button">Get Started</a>
    </section>
  </main>
</body>
</html>`,
  },
  {
    id: "portfolio",
    name: "Portfolio",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>John Doe - Portfolio</title>
  <style>
    body { font-family: sans-serif; color: #333; }
    .container { max-width: 800px; margin: 40px auto; padding: 20px; }
    header { text-align: center; margin-bottom: 40px; }
    header h1 { margin: 0; }
    header p { color: #777; }
    .project { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
    .project h3 { margin-top: 0; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>John Doe</h1>
      <p>Creative Web Developer</p>
    </header>
    <main>
      <section class="project">
        <h3>Project One</h3>
        <p>Description of the first project. Highlighting the skills and technologies used.</p>
      </section>
      <section class="project">
        <h3>Project Two</h3>
        <p>Description of the second project. Focused on another key area of expertise.</p>
      </section>
    </main>
  </div>
</body>
</html>`,
  },
    {
    id: "blank",
    name: "Blank Canvas",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blank Page</title>
  <style>
    body { font-family: sans-serif; }
  </style>
</head>
<body>
  <h1>Start creating</h1>
  <p>This is your blank canvas.</p>
</body>
</html>`,
  },
];
