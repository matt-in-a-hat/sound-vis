-- Simple web app for visualising music notes/chords as combined sound waves.



Further ideas:

 - Hookup sound, to optionally play the notes/chords selected.
 - The total wavelength, where the pattern of the combined notes repeats?





For my reference
```javascript
// Black key position generator

for (var i = 0; i < 100; i++) {
    var mod = i % 7;
    if (mod !== 2 && mod !== 6) {
        console.log((i+1) * 54 - 19);
    }
}
```
