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