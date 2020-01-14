
{
// app.post('/signup', signup)

// app.post('/login', login)

app.post('/user/image', FBAuth, uploadImage)

app.post('/user', FBAuth, addUserDetails )

app.get('/user', FBAuth, getAuthenticatedUser )


// app.get('/screams', getAllScreams)

app.get('/scream/:screamId/like', FBAuth, likeScream)

app.get('/scream/:screamId/unlike', FBAuth, unlikeScream)

app.post('/scream/:screamId/comment', FBAuth, addComment)

app.delete('/scream/:screamId/comment/:commentId', FBAuth, deleteComment)

app.post('/scream', FBAuth, postScream )

app.get('/scream/:screamId', getScream)

app.delete('/scream/:screamId',FBAuth, deleteScream)

}