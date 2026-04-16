export const createUser = `
insert into users(email,password , age ,gender ,name ,is_admin )
values($1,$2,$3,$4,$5,$6)`




export const checkUser = `
select email,  id,password , age ,gender ,name,is_admin from users 
where email=$1`


export const checkUserId = `
 select  is_admin from users 
where id=$1`

export const getFullDate = `
select email,  id , age ,gender ,name,is_admin from users offset ( $1 - 1 ) * $2 limit $2
`