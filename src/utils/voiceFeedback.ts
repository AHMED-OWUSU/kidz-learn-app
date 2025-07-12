
// Utility for providing voice feedback to kids
export class VoiceFeedback {
  private synth: SpeechSynthesis;
  private isEnabled: boolean = true;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  private getRandomMessage(messages: string[]): string {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  excellent() {
    const messages = [
      "Excellent work!",
      "Amazing job!",
      "You're a superstar!",
      "Fantastic!",
      "Outstanding!",
      "Incredible!",
      "You did it perfectly!"
    ];
    this.speak(this.getRandomMessage(messages));
  }

  levelComplete() {
    const messages = [
      "Level complete! You're amazing!",
      "Woohoo! Great job finishing this level!",
      "Awesome! You're getting better and better!",
      "Super cool! Ready for the next challenge?",
      "Brilliant work! You're so smart!"
    ];
    this.speak(this.getRandomMessage(messages));
  }

  encouragement() {
    const messages = [
      "Keep trying! You can do it!",
      "Almost there! Don't give up!",
      "Good effort! Try again!",
      "You're learning so well!",
      "Practice makes perfect!"
    ];
    this.speak(this.getRandomMessage(messages));
  }

  gameComplete() {
    const messages = [
      "Congratulations! You finished everything!",
      "Wow! You completed all the challenges!",
      "Amazing! You're a learning champion!",
      "Fantastic! You should be proud of yourself!"
    ];
    this.speak(this.getRandomMessage(messages));
  }

  speak(text: string) {
    if (!this.isEnabled || !this.synth) return;

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 0.8;
    
    // Try to use a child-friendly voice if available
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('samantha')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.synth.speak(utterance);
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.synth.cancel();
    }
  }

  isVoiceEnabled(): boolean {
    return this.isEnabled;
  }
}

export const voiceFeedback = new VoiceFeedback();
