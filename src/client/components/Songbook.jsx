import React from 'react'; 

export default class Songbook extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {

    const {fetchSongs} = this.props;
    fetchSongs();
  }

  render() {
    const { songList } = this.props;
    return (
      <div>
        <h1>Blah</h1>
        <ul className="song-list">
          { songList && songList.map((song, index) => (
            <li key={index}>
              <h3>{song.title}</h3>
              <h3>{song.author}</h3>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
