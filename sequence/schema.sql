drop table if exists sequence;
create table sequence (
  id integer primary key autoincrement,
  title text not null,
  'text' text not null
);