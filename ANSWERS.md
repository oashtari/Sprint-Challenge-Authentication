- [ ] What is the purpose of using _sessions_?

There are a variety of uses of sessions around a server storing information about a client, but in our sprint the focus was around persisting authentication information so the eliminate the need to re-enter credentials every time we make a new request to the server.

- [ ] What does bcrypt do to help us store passwords in a secure manner.

Primary function is to hash the password to prevent it from being hacked.

- [ ] What does bcrypt do to slow down attackers?

It has an algorithm that hashes the information multiple times, so an attacker would need to know the the number of hashes and that specific algorithm, getting all that takes a lot of time.

- [ ] What are the three parts of the JSON Web Token?

Header, Payload, Signature