import React from 'react'

export const Main = () => {

  const [name, setname] = useState({});

  useEffect(() => {
      const nameRef = firebase.database().ref("name");
      nameRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setname(data);
      });
    }, []);

  return (
    <div className='table'>
      <div className="cell">
       <p>{name.user1}</p>
       <p>{balance.user1}</p>
      </div>
      <div className="cell">1</div>
      <div className="cell">1</div>
      <div className="cell">1</div>
    </div>
  )
}

export default Main;