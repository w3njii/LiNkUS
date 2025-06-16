**LINKUS README**

**Milestone 1**

**Level of Achievement: Apollo 11**

Soo Jia Yang, A0312147N, Year 1 Computer Science

Yen Chong Wenjie, A0305857W, Year 1 Computer Science

# 1.  Motivation

As both of us are Year 1 students, the memory of being nervous, lost, and afraid in a new environment as freshmen is still very fresh in our minds. We believe that university can provide countless opportunities for building valuable friendships, but many students fail to take advantage of this opportunity. As the orientation period comes and goes, those who have missed out on these chances to meet new people are unlikely to meet new friends easily since students will inevitably get busier as workload increases throughout the semester. 

While social media apps such as Facebook, Instagram, TikTok, Snapchat, Telegram, etc. do help when it comes to making it easier for people to contact each other and connect, nearly 60% of college students still report feeling “very lonely” at some point during the academic year according to a survey by the [American College Health Association (ACHA)](https://www.talkspace.com/blog/loneliness-in-college/). Furthermore, they do very little when it comes to breaking the ice between people who don’t really know each other. Students who lean more towards being introverted or shy, especially when new to university and the socio-cultural environment of a new country, will struggle to make the first move and approach new people, even with the existence of many social media apps. What they need is a solution that automates this process of finding a person they can genuinely connect with, by doing much of the initial, but important, effort of finding common interests to bond over, and common schedules to have time to connect with each other. By simplifying these awkward stages, it will lower the barrier to interaction and hopefully help build confidence gradually. 

What also sets us apart from mainstream social media apps is our close integration with the infrastructure of a certain University. For instance, we can take advantage of which building students might be in at a certain time to make it easier and more convenient for them to meet up. This ensures that even when they start getting busier, they won’t see meeting up to connect as a burden, but rather as a time to take a break and relax, since they won’t have to go out of their way given their schedules. Through this way of matching, we hope to maximise the amount of time students can spend with the friends they have met through our app. 

We also found that events such as hackathons, welfare, seminars, and guest talks are often advertised through email. Many of us are often interested in only a minority of these advertised events, which forces us to filter through what we perceive as “spam”. We feel that this way of advertising is ineffective as it is not targeted towards a certain audience. This makes it difficult for organisers as they have to send out more emails, causing greater server load, and also more difficult for students to filter through the spam. 

We saw this as another opportunity to leverage our app. Since we have collected information on what a student’s interests are, we can target the advertising of events and display it in a more user-friendly manner than an email. This way, students can benefit as they will have a better experience finding an event they are more interested in, and event organisers can also benefit as they can cater advertise effectively and ensure that these advertisements go to people who are more likely to participate.


# 2.  Aim


Our aim is to help those who face challenges when it comes to finding meaningful connections in university. By automating much of the initial process, we hope to match people who are more likely to get along well and have a long-lasting friendship. In doing so, we hope that the issue of student loneliness can be reduced, leading to better mental health of university students. To do this, we aim to develop a university-specific networking app and an algorithm that matches each person with the most suitable people. 

Additionally, our app also aims to provide a smarter and more effective channel for promoting campus events by tailoring event suggestions to each student’s stated interests. This targeted approach benefits both students and event organisers: students receive more relevant opportunities without being overwhelmed by irrelevant notifications, while organisers enjoy higher engagement and more efficient outreach.

Ultimately, we aim to create a platform that enhances student life by integrating social connection and campus engagement into a seamless and supportive digital experience.


# 3. User Stories



1. As a freshman, I want to connect with my classmates from lectures and tutorials so that I won’t feel lost in a new environment.
2. As a prospective student,  I want to get to know who my potential future classmates are so I can get to know them before going to class.
3. As a current student, I want to be able to find others with similar interests as me, so we can form a group and destress by working on our hobbies.
4. As an international student unfamiliar with local activities, I want to find others who can introduce me to the country’s environment. 
5. As a student living on campus, I want to connect with others who live nearby so that we can organise meetups and group activities more conveniently. 
6. As a student, I want to explore my hobbies and find new interests through interest groups and related events easily, instead of filtering through my email.


# 4. Features


## 	4.1. User Profile (core)



* Users can create and personalise their own profile, we plan to start off by implementing profile pictures, and then changing it for avatars once everything else is solid. 
* We prefer avatars over profile pictures because we value anonymity and want avoid judgements based on appearance.
* We want to create a welcoming environment as much as possible, where connections are based on shared interests and values, not on appearances.


## 	4.2. Input Timetable and Classes (core)



* Users will be able to input the courses they take and their class timings, this will be one of the criteria used by the system to find matches. 
* Users with similar schedules are more likely to be matched with each other.
* We hope that this feature allows students in the same slot to get to know each other first before attending their first class, making it less scary and pressuring. 


## 4.3. Messaging (core)



* Matched users will be able to communicate with each other via text messages.
* To start messaging another user, one will have to send an invite/request and the other will have to accept it.
* They can also join group chats of eg. same modules, tutorials, interests, or create their own. 


## 4.4. Interests-Based matching (extension)



* Users can key in things or topics that they are interested in, this will be another criteria where users will be matched based on.
* Interests of a user can also be displayed on their profile.

## 4.5. Residential matching (extension)

* Users can key in their dormitory or residence location, this is another criteria that users will be matched based on.
* This is when specific university infrastructure will be used as each campus will have different dormitory buildings and locations.


## 	4.6. NUS Events (extension)



* Extra-curricular events organised by NUS or other clubs and societies can be displayed and recommended based on users’ interests.
* There will be an area dedicated for NUS Events, users can scroll through the “catalogue” of events and click into it for more information if they are interested. 


## 	4.7. Leaderboard (extension)



* There can be a leaderboard which ranks users based on how many events they have attended and highest number of new connections, this can be updated weekly/monthly. 
* We are still contemplating about this feature as it could lead to social pressure and encourage unhealthy competition. 


## 	4.8. Streaks (extension)



* Users can have streaks displayed on their profile when they have consistent connections with another.
* This is another feature we are still contemplating for the same reasons as the previous feature. 


## 	4.9. Memories (extension)



* Users have a shared album of photos with their connections, this can be displayed on their profile. 


## 4.10. Auto-detection scheme (extension)



* We discourage any harmful or hurtful content and exchanges, users who exhibit such behaviour can be reported by others and an investigation will take place which could lead to suspension of their account.
* More serious violations such as harassment will lead to reporting to campus security/office for further action. 


# 5. Timeline



1. Milestone 1 - Technical proof of concept (2 June)
    - User profile and input timetable/classes feature done for one class and profile
2. Milestone 2 - Prototype (30 June)
    - Get the matching system to work for more users and classes
    - Basic UI for displaying matches 
    - Basic messaging system
    - Basic detection scheme
3. Milestone 3 - Extended system (28 July)
    -  Support for more classes 
    -  Improved UI 
    -  Extend to interests, dormitory location feature, events, leaderboard, streak and memories


# 6. Tech Stack

Frontend: JavaScript, HTML, React.js

Backend: Node.js, JSON, JavaScript, CSS, MongoDB, Socket.io

Database: Firebase, SQL
