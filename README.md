#### Simple web app for visualising music notes/chords as combined sound waves.


Click notes to combine waves. Click again to deselect.   
Use mouse scroll on wave to zoom in/out.   
Click the wave to play the note(s)/chord. Warning: start with your speakers on low volume!    


Further ideas:

 - Display the total wavelength, approximately where the pattern of the combined notes repeats?



For my reference:
```javascript
// Black key position generator

for (var i = 0; i < 100; i++) {
    var mod = i % 7;
    if (mod !== 2 && mod !== 6) {
        console.log((i+1) * 54 - 19);
    }
}
```

Thanks to Pedro Ladaria for the audio library at http://codebase.es/riffwave/
