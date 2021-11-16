# emergency-response


## High level Procedure
- Get coordinates
- Call emergency service

Process
- Get saved emergency responses and their coordinates
- Calculate one with shortest distance and call that one (Haversine Formula)
- Test getting distance between two locations and run a foreach

Algorithm 
current location 2
a = 3
b = 4
c = 5

1. Check if there is number in current town else check take city 
2. Compare each element on the number.
 a - cl = 1
location_to_call= a
distance = 1

b-a = 2
output= 2
if output < distance
distance = output

c-a =3
output = 3
if output < distance
distance = output  
