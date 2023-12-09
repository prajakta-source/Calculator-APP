import { useState } from 'react';

let op1, op2;

export default function App() {
  const [number, setNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [operand, setOperand] = useState('');
  const [profile, setProfile] = useState('1');

  const handleNumber = (e) => {
    const el = e.target.textContent;
    setOperand((pre) => pre + el);
  };

  const handleOperator = (e) => {
    op1 = operand * 1;
    setOperand((pre) => pre + e.target.textContent);
    setOperator(e.target.textContent);
  };

  const handleSubmit = () => {
    if (operator.length < 1 || operand.length < 1) return;

    if (isNaN(operand)) {
      op2 = Number(operand.slice(operand.indexOf(operator) + 1));
      if (operator === operand.at(-1)) return;
    }

    let result;
    switch (operator) {
      case '+':
        result = op1 + op2;
        setOperand(result);
        break;
      case '-':
        result = op1 > op2 ? op1 - op2 : op2 - op1;

        setOperand(result);
        break;
      case 'x':
        result = op1 * op2;

        setOperand(result);
        break;
      case '/':
        result = op1 / op2;

        setOperand(result.toFixed(2));
        break;

      default:
        console.log('No operation');
    }
  };

  return (
    <>
      <main
        className={`container ${
          profile === '2' ? 'theme-2' : profile === '3' ? 'theme-3' : 'theme-1'
        }`}
      >
        <Theme profile={profile} setProfile={setProfile} />
        <Result output={operand} profile={profile} />
        <Keypad
          number={number}
          setNumber={setNumber}
          handleNumber={handleNumber}
          handleOperator={handleOperator}
          handleSubmit={handleSubmit}
          setOperand={setOperand}
          operand={operand}
        />
      </main>
      <Footer />
    </>
  );
}

function Theme({ profile, setProfile }) {
  if (profile === '2') {
    document.body.classList.add('theme-2-main');
    document.body.classList.remove('theme-3-main');
    document.body.classList.remove('theme-1-main');
  } else if (profile === '3') {
    document.body.classList.add('theme-3-main');
    document.body.classList.remove('theme-2-main');
    document.body.classList.remove('theme-1-main');
  } else {
    document.body.classList.add('theme-1-main');
    document.body.classList.remove('theme-3-main');
    document.body.classList.remove('theme-2-main');
  }

  return (
    <div className="theme">
      <h1 className="header-primary">calc</h1>
      <div className="theme__toggle">
        <p style={{ textTransform: 'uppercase' }}>Theme</p>
        <input
          type="range"
          min={1}
          max={3}
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
      </div>
      <div className="theme__labels">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
}

function Result({ output, profile }) {
  return (
    <div className="result">
      <p>{output.length < 1 ? 0 : output.toLocaleString()}</p>
    </div>
  );
}

function Keypad({
  number,
  setNumber,
  handleNumber,
  handleOperator,
  handleSubmit,
  setOperand,
  operand,
}) {
  return (
    <div className="keypad">
      <div className="number" onClick={handleNumber}>
        7
      </div>
      <div className="number" onClick={handleNumber}>
        8
      </div>
      <div className="number" onClick={handleNumber}>
        9
      </div>
      <div
        className="number del"
        onClick={() => {
          setOperand((pre) =>
            pre.toString().slice(0, pre.toString().length - 1)
          );
        }}
      >
        DEL
      </div>
      <div className="number" onClick={handleNumber}>
        4
      </div>
      <div className="number" onClick={handleNumber}>
        5
      </div>
      <div className="number" onClick={handleNumber}>
        6
      </div>
      <div className="number" onClick={handleOperator}>
        +
      </div>
      <div className="number" onClick={handleNumber}>
        1
      </div>
      <div className="number" onClick={handleNumber}>
        2
      </div>
      <div className="number" onClick={handleNumber}>
        3
      </div>
      <div className="number" onClick={handleOperator}>
        -
      </div>
      <div className="number" onClick={handleNumber}>
        .
      </div>
      <div className="number" onClick={handleNumber}>
        0
      </div>
      <div className="number" onClick={handleOperator}>
        /
      </div>
      <div className="number" onClick={handleOperator}>
        x
      </div>
      <div className="number reset" onClick={() => setOperand('')}>
        RESET
      </div>
      <div className="number equal" onClick={handleSubmit}>
        =
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="attribution">
      Challenge by{' '}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="https://github.com/nazimulhossain">Nazimul Hossain</a>
      .
    </footer>
  );
}
