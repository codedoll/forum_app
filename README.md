## **Unit 2 Project: Forum App** ##
--------
![Forum index image](https://github.com/codedoll/forum_app/blob/master/forum_index.JPG?raw=true)

Wireframe for forum app
------------------------------
![Wireframe](https://github.com/codedoll/forum_app/blob/master/Wireframe_onepager.png?raw=true)

Model-View-Presenter (MVP)
------------------------------
**Models**

 - Users model
	 - username : String
	 - password : String
 - Topics
	 - title : String
	 - vote : Number
 - Comments
	 - comment : String

Flowchart for forum app
------------------------------
![Wireframe](https://github.com/codedoll/forum_app/blob/master/forumapp.png?raw=true)


User Stories
------------
 - User must be able to log in with a username
 - User must be able to create a topic
 - User must be able to see topics he created
 - User topic must be open to comments
 - User must be able to see comments on topics he created
 - User must be able to comment on other topics
 - User can optionally vote on topics
 - The user interface must be clean and visually appealing
 

Advanced features
------------
- Username and password authentication
- User's access is limited based on his session credentials and database login
- Responsive website that looks appealing on all browsers and devices
- Cipher option for spoilers
 


Technologies used
--------------------------------
- Javascript
- Packages I learned about:
	 - momentjs http://momentjs.com/
	 - sanitizehtml https://www.npmjs.com/package/sanitize-html
	 - marked https://github.com/chjj/marked
	 - simpleMDE https://github.com/NextStepWebs/simplemde-markdown-editor
	 - made a middleware to check for session validity

