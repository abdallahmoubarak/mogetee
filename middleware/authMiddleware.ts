import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
}

const authMiddleware =
  (handler: NextApiHandler) =>
  async (req: AuthenticatedRequest, res: NextApiResponse) => {
    // Get the JWT token from the request header
    const token: any = req.headers.authorization?.replace("Bearer ", "");

    try {
      // Verify the JWT token
      //@ts-ignore
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as any;

      // Attach the decoded token to the request object
      req.user = decodedToken;

      // Call the actual API route or handler
      return await handler(req, res);
    } catch (error) {
      // Return unauthorized status if token verification fails
      return res.status(401).json({ error: "Unauthorized" });
    }
  };

export default authMiddleware;
