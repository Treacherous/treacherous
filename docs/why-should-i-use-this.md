# Why should I use it?

There are LOTS of validation frameworks out currently, some synchronous, some are async, 
some work off the DOM some work off models. Some of them are tied to specific front end frameworks, 
others are mainly for the node world.

However in most cases you will be hard pressed to find a easy to use async based one which is 
agnostic of frameworks/platforms but can be plugged into them. This was the idea behind Treacherous, 
a simple validation framework which could be shared between browser and server as well as 
being able to expose MVVM style subscriptions for other frameworks to hook into.

If you share code between multiple worlds (i.e nodejs, browser, mobile) then you may have had
issues before where you are tied into a specific framework for your front ends and want to 
re-use your models in the back end as a contractual layer or something. In these cases 
you often either end up maintaining 2 sets of validation which is ok, but it could be better, 
and this is where Treacherous attempts to improve this approach.

It is also useful for libraries which contain pure data concerns and have no notion 
of front end frameworks, so you may have one central library and have one front end
using ng and one front end using aurelia or knockout for different devices etc. 
In this case you can have validation as a pure data concern and just plug the validation 
logic into your MVVM framework so it will automatically listen for the validation concerns 
letting you re-use more of your code base in a more consistent way.

Ultimately each framework tends to have it's own validation system, but with Treacherous you 
can write your validation rules once, and consume them anywhere (that has a compatible binding layer, if there isn't one, just write your own or ask us to help you out in gitter).