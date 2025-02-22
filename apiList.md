# DevTinder APIs

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile

connectonRequestRouter
-POST /request/send/interested/:userID
-POST /request/send/ignored/:userID

-POST /request/review/accepted/:requestID
-POST /request/review/rejected/:requestID

-GET /connections
-GET /requests/received
-GET /feed - Gets you the profiles of  other users on platform

Status: ignore,interested, accepted, rejected