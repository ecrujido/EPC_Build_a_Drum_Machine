import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

const soundsGroupOne = [
{
  keyCode: 81,
  key: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  keyCode: 87,
  key: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{
  keyCode: 69,
  key: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },

{
  keyCode: 65,
  key: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  keyCode: 83,
  key: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  keyCode: 68,
  key: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  keyCode: 90,
  key: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  keyCode: 88,
  key: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  keyCode: 67,
  key: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



const soundsGroupTwo = [
{
  keyCode: 81,
  key: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },

{
  keyCode: 87,
  key: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },

{
  keyCode: 69,
  key: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },

{
  keyCode: 65,
  key: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },

{
  keyCode: 83,
  key: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },

{
  keyCode: 68,
  key: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },

{
  keyCode: 90,
  key: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },

{
  keyCode: 88,
  key: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },

{
  keyCode: 67,
  key: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];



const soundsName = {
  heaterKit: 'Heater Kit',
  smoothPianoKit: 'Smooth Piano Kit' };


const soundsGroup = {
  heaterKit: soundsGroupOne,
  smoothPianoKit: soundsGroupTwo };


const keyboardKey = ({ play, sound: { id, key, url, keyCode } }) => {
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);}, []);

  const handleKeyDown = event => {
    if (event.keyCode === keyCode) {
      play(key, id);
    }
  };

  return (
    React.createElement("button", { 
      id: keyCode, 
      className: "drum-pad", 
      onClick: () => play(key, id)
    },
    React.createElement("audio", {
      className: "clip",
      id: key,
      src: url 
    }), key)
  );
};

const Keyboard = ({ power, play, sounds }) =>
  React.createElement("div", { 
    className: "keyboard" 
  },
  power ? sounds.map(sound => React.createElement(keyboardKey, { 
    play: play, 
    sound: sound
  })
  ) : sounds.map(sound => React.createElement(keyboardKey, 
    { play: play,
      sound: { ...sound, url: '#' } 
    })
  )
);



const drumControl = ({ stop, power, name, handleVolume, volume, changeSoundsGroup }) => {
  return (
    React.createElement("div", { className: "control" },

    React.createElement("button", { onClick: stop }, "Turn ", power ? 'Off' : 'On'),
    
    React.createElement("h2", { id: "display" }, name),
    
    React.createElement("h2", { className: "vol" }, "Volume: ", Math.round(volume * 100), "db"),
    
    React.createElement("button", { onClick: changeSoundsGroup }, "Change Sounds "),
    
    React.createElement("br", null),

    React.createElement("input", { className: "inp", max: "1", min: "0", step: "0.01",
      type: "range", value: volume, onChange: handleVolume })));
};


const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState('');
  const [soundsType, setSoundsType] = React.useState('heaterKit');
  const [sounds, setSounds] = React.useState(soundsGroup[soundsType]);

  const stop = () => {
    setPower(!power);
  };

  const handleVolume = event => {
    setVolume(event.target.value);
  };

  const colorBlack = '#000000';
  const colorWhite = 'rgba(230, 230, 230)';

  const styleActiveKey = audio => {
    audio.parentElement.style.backgroundColor = colorBlack;
    audio.parentElement.style.color = colorWhite;
  };

  const deactivate = audio => {
    setTimeout(() => {
      audio.parentElement.style.backgroundColor = colorWhite;
      audio.parentElement.style.color = colorBlack;
    }, 300);
  };

  const play = (key, sound) => {
    setSoundName(sound);

    const audio = document.getElementById(key);
    styleActiveKey(audio);
    audio.currentTime = 0;
    audio.play();
    deactivate(audio);
  };

  const changeSoundsGroup = () => {
    setSoundName('');
    if (soundsType === 'heaterKit') {
      setSoundsType('smoothPianoKit');
      setSounds(soundsGroup.smoothPianoKit);} else
    {
      setSoundsType('heaterKit');
      setSounds(soundsGroup.heaterKit);
    }
  };

  const setKeyVolume = () => {
    const audios = sounds.map(
    sound => document.getElementById(sound.key));
    audios.forEach(audio => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };

  const newLine = () => {
    return createElement("div", {className: "divider"});
  };



  return(
    React.createElement("div", { id: "drum-machine" },
    setKeyVolume(),
    React.createElement("div", { className: "wrapper" },
    React.createElement(Keyboard, { 
      power: power,
      play: play,
      sounds: sounds }
    ),
    React.createElement(drumControl, {
      stop: stop,
      power: power,
      volume: volume,
      handleVolume: handleVolume,
      newLine: newLine,
      name: soundName || soundsName[soundsType], changeSoundsGroup: changeSoundsGroup
    }),

    React.createElement("div", { id: "mod" },

    React.createElement("img", { src: 'https://drive.google.com/thumbnail?id=1O3anVg9V2UzncT04_J-sX1ok6I1uAzTb', className: "image", alt: 'piano-keyboard' }),

    React.createElement("h5", { className: "dr" }, "Drum Machine " + String.fromCharCode(169) +  " 2024"))))); 
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));