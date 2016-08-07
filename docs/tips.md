# Tips

This will hopefully get bigger as more users come up with common concerns or patterns.

## Handling model instance changes

So in the front end world it is quite common to use JSON objects as the data models, and a lot of the time
those models are entirely overwritten by data returned from APIs or other systems.

In this case you have a few options, you can either `release` the current validation group instance
and create a new one, or you can make use of hot swapping of the model assuming it meets the same
schema, this can be done by doing `myValidationGroup.changeValidationTarget(myNewModel);` and this will
keep the same rules and objects as before but will swap out the current model being watched for the new 
model.


## I don't like how you set stuff up

Thats fine, everything is composable however you want, by default treacherous' main setup is included
within `rule-registry-setup` and `exposer`. If you look in those files you can see how we just expose
shortcuts to builders which do a lot of the leg work for you. However if you want to make your own
setup stuff or heavily customise any part of the system, just make your own entry point logic and 
make sure you adhere to the interfaces, you can make your own `IValidationGroup` or any other 
interface if you want.

The whole system was written in a very separated way making sure IoC was adhered to every step of the 
way, so you can tear out chunks and put your own stuff in if you want, however in most cases you won't 
need to, you will just want to do `createRuleset` and `createGroup` and be done with it.