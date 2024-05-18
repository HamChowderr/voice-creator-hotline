var vapiInstance = null;
const assistant = {
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    systemPrompt: "You're a versatile AI assistant named Vapi who is fun to talk with.",
  },
  voice: {
    provider: "11labs",
    voiceId: "paula",
  },
  firstMessage: "Hi, I am Vapi how can I assist you today?",
};
const apiKey = "28bfd3a4-d8d3-4921-9c60-a93443c355ed"; // Substitute with your Public key from Vapi Dashboard.
const buttonConfig = {
  position: "bottom-right", // "bottom" | "top" | "left" | "right" | "top-right" | "top-left" | "bottom-left" | "bottom-right"
  offset: "40px", // decide how far the button should be from the edge
  width: "50px", // min-width of the button
  height: "50px", // height of the button
  idle: { // button state when the call is not active.
    color: `rgb(93, 254, 202)`, 
    type: "pill", // or "round"
    title: "Have a quick question?", // only required in case of Pill
    subtitle: "Talk with our AI assistant", // only required in case of pill
    icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone.svg`,
  },
  loading: { // button state when the call is connecting
    color: `rgb(93, 124, 202)`,
    type: "pill", // or "round"
    title: "Connecting...", // only required in case of Pill
    subtitle: "Please wait", // only required in case of pill
    icon: `https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg`,
  },
  active: { // button state when the call is in progress or active.
    color: `rgb(255, 0, 0)`,
    type: "pill", // or "round"
    title: "Call is in progress...",
    subtitle: "End the call.",
    icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg`,
  },
};

(function (d, t) {
  var g = document.createElement(t),
      s = d.getElementsByTagName(t)[0];
  g.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g, s);

  g.onload = function () {
    vapiInstance = window.vapiSDK.run({
      apiKey: apiKey, // mandatory
      assistant: assistant, // mandatory
      config: buttonConfig, // optional
    });

    // Add event listeners
    vapiInstance.on('speech-start', () => console.log('Speech has started'));
    vapiInstance.on('speech-end', () => console.log('Speech has ended'));
    vapiInstance.on('call-start', () => console.log('Call has started'));
    vapiInstance.on('call-end', () => console.log('Call has stopped'));
    vapiInstance.on('volume-level', (volume) => console.log(`Assistant volume level: ${volume}`));
    vapiInstance.on('message', (message) => console.log(message));
    vapiInstance.on('error', (e) => console.error(e));
  };
})(document, "script");
