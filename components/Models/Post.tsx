import {User} from "./User";

export type Post  = {
  text?: String,
  id?: String,
  owner: User,
  creationDate: String,
  title?: String,
  upVotes?: number
}
