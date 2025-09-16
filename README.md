## Gompei's Gear

https://a3-aaron-waller.vercel.app/

***NOTE: For the dummy account to get in (unless a new account is to be created, no spaces in the actual username/password):
username: test
password: test***

The goal of this application is to create a web application that allows for users to create an account, place orders, and view/modify their orders. This application would allow for the fictional Gompei's Gear to be able to have a way for its customers to be able to place and modify the orders that would be filed by the company. I would say the most challenging aspect
of the development of this web application would be the integration of auth0 into the application as the complexities as well as the design choice, and insufficient documentation made it challenging to troubleshoot issues. Additionally, the requirements for the application to work with auth0 on a hosting site made frequent refactoring of code necessary. I chose the auth0 local passport strategy to handle authentication because it was the most straightforward to implement as well as needing the least amount of connections to other APIs. I used the tailwind css framework to style the application because I have used this framework previously. Additionally, I like the intuitive manner in which the framework and lain out the extensive documentation. I used the following express middleware packages:

- crypto: this package allowed for me to preform encryption operations on values, such as hashing which is used for password storage and comparison.
- connect-mongo: this package allowed for me to store session information in a mongodb database and was required as the additional functionality is separate from the mongodb package.
- mongodb: this package allowed for me to store the user submitted data in a persistent database instead of having to store in the server.
- express-session: this package allowed for me to do session manangement; it allowed me to create and delete sessions, as well as handle users.
- passport: this package was used in conjunction with the passport-local package in order to provide auth0 functionality to the code.
- passport-local: this package was used in conjunction with the passport package to provide a local (not using other websites) auth0 implementation.
- path: this package was used to allow for more stable relative pathing in server code.
- pug: this package was used to render the .pug files and create a more reactive application than just standard static html.
- body-parser: this package allowed for the server to better parse the body of incoming requests to attempt to resolve the type of data, so it can be used in later middleware.

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the local strategy to authenticate users
- **Tech Achievement 2**: I deployed to vercel instead of render
- **Tech Achievement 3**: I got 100% for the lighthouse tests as shown by the image below

![Image of the run](./forGrader/Screenshot%202025-09-16%20174455.png)

- **Tech Achievement 4**: I used a combination of routes, views, and environmental variables in order to make the page more modular as well as more standardly structured. As part of defining the routes I had to make decisions that involved how I would delegate tasks to different routers and write code that would allow different scripts, files, and other routes to direct user input to the appropriate spot. Additionally, I used views and .pug files in order to write the actual html code that would be displayed on the page. In order to use the .pug files I had to change how my application sent and received requests as the application would not be sending directly the html files, so the endpoints would have the call the view command. Put together, with the effort I put in to these achieves I was able to make a better designed web application that was no longer static. Finally, I used environmental variables to store sensitive data so that the values of things such as the API keys would not be stored directly in the code, thus making the application more secure as a whole. I think that for these achievements, a reasonable amount of points would be 5 points as they were about as much work as other 5 point achievements.

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative:
  1. Associate a label with every form control: used throughout the pages, all form elements have a label or in a special case a default value (for the enter one's own option in the radio buttons).
  2. Don't use color alone to convey information: used on the login in screen when a field is missing, there is a pop-up that reminds the user to input text and will not let them hit submit until they do.
  3. Provide sufficient contrast between foreground and background: used throughout the document because the text is always black and the background is a light color. Additionally, the hover are also set to be in between the background light color and the black used for the text so it provides contrast towards both.
  4. Provide clear and consistent navigation options: used throughout the pages, a consistent naming scheme is used in order to make it easier for people to be able to understand what each element does or displays
  5. Provide easily identifiable feedback: used on login screen when a field is missing, there is a pop-up that reminds the user to input text and will not let them hit submit until they do.
  6. Use headings and spacing to group related content: used throughout the pages, headers are always directly above the information that they represent, physical spacing (lines and borders) are used to separate unrelated information.
  7. Provide informative, unique page titles: used throughout the pages, each page has as part of the title the purpose of the page (i.e. the login page has login in the title), as well as the app name.
  8. Identify page language and language changes: used throughout the pages, all pages have the html tag with the attribute lang="en" as all the pages are in english
  9. Use mark-up to convey meaning and structure: used in all pages except login page, the page is split into different sections that serve a purpose. The nav section is used for navigation and the other sections contain related content.
  10. Write code that adapts to the user’s technology: used in all pages, much of the css uses functionality that is adaptive such as selecting auto for certain attributes and relative positioning rather than absolute positioning.
  11. Use headings to convey meaning and structure: used on all pages, headings are used throughout the pages in order to structure the pages and inform the user on the purpose of sections of the page.
  12. Make link text meaningful: used on all pages with links, the link text is positioned and written in a way that it tells the user where they will go. An example is in the nav bar where the different actions have the action name as the text for the link, like order takes the person to the view orders page, and home takes the users to the home page.




