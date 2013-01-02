module.exports = function (compound, User) {
  // define User here
  User.findOrCreate = function (data, done) {
	    /* FACEBOOK OPENID */
	    if (data.profile.provider == "facebook") {
	        User.all({
	            where: {
	                facebookID: data.id
	            }, limit: 1
	        }, function (err, user) {
	            if (user[0]) return done(err, user[0]);
	            User.create({
	                displayName: data.profile.displayName,
	                email: data.profile.emails[0].value,
	                facebookID: data.openId,
	                provider:"facebook",
	                createDate:new Date(),
	                lastLogin:new Date()
	            }, done);
	        });
	    } else

	    /* SOMETHING NOT KNOWN YET */
	    {
	        console.log("DONT NOW HOW TO HANDLE THIS USER.")
	        console.log(data.profile);
	    }
	};
};