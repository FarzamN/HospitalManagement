import {useState, useEffect} from 'react';

const useGreet = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    let newGreeting;

    if (currentHour >= 5 && currentHour < 12) {
      newGreeting = 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = 'Good afternoon!';
    } else {
      newGreeting = 'Good evening!';
    }

    setGreeting(newGreeting);
  }, []);

  return {greeting};
};

export default useGreet;
