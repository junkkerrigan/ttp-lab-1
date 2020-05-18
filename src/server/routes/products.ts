import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    res.status(200).send(
        await req.context.models.Product.findAll()
    );
});

export { router as productsRouter };
