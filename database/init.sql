DROP TABLE IF EXISTS song CASCADE;

CREATE TABLE song (
    id SERIAL PRIMARY KEY,
    album TEXT,
    artist_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    release_year INT NOT NULL,
    song_name TEXT NOT NULL,
    genre TEXT
);

insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Delta Kream', 'The Black Keys', '/app/mp3/The Black Keys - Crawling Kingsnake [Official Audio] [ ezmp3.cc ].mp3', 2021, ' Crawling Kingsnake', 'Blues');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('-', 'Chuck Berry', '/app/mp3/Sweet Little Sixteen.mp3', 1958, ' Sweet Little Sixteen', 'R&B/Soul, Pop, Rock, Blues');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('-', 'Chuck Berry', '/app/mp3/You Never Can Tell.mp3', 1964, ' You Never Can Tell ', 'Rock''n''roll, Rhythm and blues');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('In the Right Place', 'Dr. John', '/app/mp3/Dr. John - Right Place Wrong Time.mp3', 1973, 'Right place wrong time', ' R&B/Soul');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Come on In', 'The Black Tornado, Thorbjørn Risager', '/app/mp3/Last Train.mp3', 2019, ' Last Train', 'Blues');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Alannah Myles', ' Alannah Myles', '/app/mp3/Alannah Myles Black Velvet.mp3', 1989, 'black velvet', 'Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Aerosmith', 'Aerosmith', '/app/mp3/Aerosmith - Dream On (Audio) .mp3', 1973, ' Dream On', 'Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Machine Head', 'Deep Purple', '/app/mp3/Deep Purple - Highway Star.mp3', 1972, 'highway star', 'Hard rock, Heavy metal, Metal, Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Tres Hombres', 'ZZ TOP', '/app/mp3/La Grange (2005 Remaster).mp3', 1973, 'La Grange - 2005 Remaster', 'Blue Rock / Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Black Holes', 'the blue stones', '/app/mp3/Rolling With the Punches.mp3', 2012, 'Rolling with Punches', 'Rock, Indie/Alternative');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Stranger in Town', ' Bob Seger & The Silver Bullet Band', '/app/mp3/Old Time Rock & Roll.mp3', 1978, ' Old Time Rock & Roll', 'Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Iron Maiden: Flight 666', 'Iron Maiden', '/app/mp3/Iron Maiden - The Trooper (Remixed and Remastered) .mp3', 1983, ' The Trooper', 'Heavy metal, Metal');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('-', 'Chuck Berry', '/app/mp3/No Particular Place To Go .mp3', 1964, 'no particular place to go', 'Rock, Blues');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('The Music of Grand Theft Auto V', 'Oh No', '/app/mp3/Welcome To Los Santos.mp3', 2013, 'Welcome to Los Santos', 'reggae');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Rocks', 'aerosmith', '/app/mp3/Aerosmith - Back In The Saddle (Audio).mp3', 1976, 'back in the saddle', 'hard Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ( ' Garage Inc.', 'Metalica', '/app/mp3/Metallica - Whiskey in the jar.mp3', 1998, 'Whiskey in the jar', 'Heavy Metal');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Backseat', 'Peer Günt', '/app/mp3/Peer Günt  Backseat.mp3', 1986, 'Peer Günt - Backseat', 'hard Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Rocks', 'Billy Idol', '/app/mp3/Billy Idol - Rebel Yell (Official Music Video).mp3', 1983, 'Robel Yell', 'Rock/Pop');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Back in Black', 'AC DC', '/app/mp3/AC DC - Shoot To Thrill.mp3', 1980, 'Shoot to Trill', 'hard Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('The Razors Edge', 'AC DC', '/app/mp3/AC DC - Fire Your Guns (Official Audio).mp3', 1990, 'Fire you guns', 'hard Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Metallica', 'Metallica', '/app/mp3/Enter Sandman (Remastered).mp3', 1991, 'Enter the sand', 'Metal');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Ride the Lightning', 'Metallica', '/app/mp3/For Whom The Bell Tolls (Remastered).mp3', 1984, 'For Whom the Bells Told', 'Metal');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Woodstock', 'Låt av Portugal', '/app/mp3/Portugal. The Man - So Young.mp3', 2017, 'so young', ' Indierock, Indie/Alternativ');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('I Be Trying', 'Cedric Burnside', '/app/mp3/Cedric Burnside - _Step In_ .mp3', 2021, 'Step In', 'Blues');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Ride the Lightning', 'Metallica/Ray Davies', '/app/mp3/You Really Got Me.mp3', 1964, 'You Really Got Me', 'Hard Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values (' Bad to the Bone', 'George Thorogood', '/app/mp3/George Thorogood & The Destroyers - Bad To The Bone.mp3', 1982, ' Bad to the Bone', 'Hard Rock/Blues');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Eliminator', 'ZZ Top', '/app/mp3/ZZ Top Sharp Dressed Man.mp3', 1983, 'Sharp Dressed Man', 'Rock/Blues Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Morrison Hotel', 'Doors/Crystal Method', '/app/mp3/Roadhouse Blues.mp3', 1970, 'RoadHouse Blues', 'Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Drones', 'Muse', '/app/mp3/Psycho - Muse (Lyrics).mp3', 2015, 'Pyscho', 'hard Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ( 'Crash and Burn', 'Pat Travers', '/app/mp3/Snortin’ Whiskey.mp3', 1980, 'Snorting Whiskey', 'Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ( 'Power Up', 'AC DC', '/app/mp3/AC DC - Shot In The Dark (Official Audio).mp3', 2020, 'Shot in the dark', 'Power Up');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ( 'Back in Black', 'AC DC', '/app/mp3/AC DC - Hells Bells (Official Video).mp3', 1980, 'hells bells', 'hard Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ( 'The Game', 'Queen', '/app/mp3/Queen - Another One Bites The Dust [Lyrics].mp3', 1980, 'another one bites the dust', 'Funck Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values (' Cherry Pie', 'Warrant', '/app/mp3/Cherry Pie.mp3', 1990, 'Cherry Pie', 'Klassisk rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Out For Blood', 'Valley Of Wolves', '/app/mp3/Chosen One - Valley of Wolves (LYRICS).mp3', 2018, 'Chosen One', 'Blue/Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Fandango', 'ZZ Top', '/app/mp3/Tush (2006 Remaster).mp3', 1975, 'Tush', 'Rock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Raising Hell', 'Run–D.M.C.', '/app/mp3/Aerosmith - Walk This Way.mp3', 1975, 'walk this way', 'Hard rock, Raprock');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('leather teeth', 'Carpenter Brut', '/app/mp3/Carpenter Brut - Leather Teeth.mp3', 2018, 'leather teeth', 'Metal, Dans/Electro');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('breakin outta hell', 'Airbourne', '/app/mp3/Airbourne - breakin'' outta hell.mp3', 2016, 'breakin outta hell', 'Hard rock, Heavy metal');
insert into song (album, artist_name, file_path, release_year, song_name, genre) values ('Machine Head', 'Deep Purple', '/app/mp3/Deep Purple - Smoke on the Water (Audio).mp3', 1972, 'Smoke On the Water', 'Klassisk rock');
