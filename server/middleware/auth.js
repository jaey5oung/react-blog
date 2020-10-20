import jwt from "jsonwebtoken"
import config from "../config/index"
const { JWT_SECRET } = config

const auth = (req, res, next) => {
  const token = req.header("x-auth-token") //브라우저의 header에 token값이 저장이 되어있기 때문에

  if (!token) {
    return res.status(401).json({ msg: "토큰 없음. 인증이 거부됨!!" })
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) // 토큰 해석
    req.user = decoded
    next()
  } catch (e) {
    console.log(e)
    res.status(400).json({ msg: "토큰이 유효하지 않습니다" })
  }
}

export default auth
