import { Request, Response } from 'express';
import { pricingProfiles, productAdjustments, products } from '../models/dataStore';
import { v4 as uuid } from 'uuid';
import { calculateAdjustments } from '../utils/calculateAdjustments';

export const createPricingProfile = (req: Request, res: Response): void => {
	const { basePriceSource, adjustmentMode, adjustmentDirection, productIds, productAdjustments: incomingAdjustments } = req.body;

	const profileId = uuid();
	const profile = {
		id: profileId,
		basePriceSource,
		adjustmentMode,
		adjustmentDirection,
		productIds,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	pricingProfiles.push(profile);

	const adjustments = calculateAdjustments({
		adjustmentMode,
		adjustmentDirection,
		pricingProfileId: profileId,
		productAdjustments: incomingAdjustments,
		products
	});

	adjustments.forEach(adj => productAdjustments.push(adj));

	res.json({ profile, adjustments });
};

export const getAllPricingProfiles = (req: Request, res: Response): void => {
	res.json(pricingProfiles);
};

export const getPricingProfileById = (req: Request, res: Response): void => {
	const { id } = req.params;
	if (!id) {
		res.status(400).json({ error: 'Missing profile ID' });
		return;
	}
	const profile = pricingProfiles.find(p => p.id === req.params.id);
	if (!profile) {
		res.status(404).json({ error: 'Not found' });
		return;
	}

	const adjustments = productAdjustments.filter(a => a.pricingProfileId === profile.id);
	res.json({ profile, adjustments });
};