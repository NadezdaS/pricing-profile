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

export const updatePricingProfileById = (req: Request, res: Response): void => {
	const { id } = req.params;
	const profileIndex = pricingProfiles.findIndex(p => p.id === id);

	if (profileIndex === -1) {
		res.status(404).json({ error: 'Pricing profile not found' });
		return;
	}

	const existingProfile = pricingProfiles[profileIndex];
	const updatedProfile = {
		...existingProfile,
		...req.body,
		updatedAt: new Date(),
	};
	pricingProfiles[profileIndex] = updatedProfile;

	// If productAdjustments need to be updated:
	if (
		'replaceAdjustments' in req.body &&
		req.body.replaceAdjustments === true &&
		req.body.productAdjustments
	) {
		// Remove old adjustments for this profile
		for (let i = productAdjustments.length - 1; i >= 0; i--) {
			if (productAdjustments[i].pricingProfileId === id) {
				productAdjustments.splice(i, 1);
			}
		}

		const newAdjustments = calculateAdjustments({
			adjustmentMode: updatedProfile.adjustmentMode,
			adjustmentDirection: updatedProfile.adjustmentDirection,
			pricingProfileId: updatedProfile.id,
			productAdjustments: req.body.productAdjustments,
			products,
		});

		newAdjustments.forEach(adj => productAdjustments.push(adj));
		res.json({ profile: updatedProfile, adjustments: newAdjustments });
	}

	res.json({ profile: updatedProfile });
};

export const deletePricingProfileById = (req: Request, res: Response): void => {
	const { id } = req.params;
	const profileIndex = pricingProfiles.findIndex(p => p.id === id);

	if (profileIndex === -1) {
		res.status(404).json({ error: 'Pricing profile not found' });
		return;
	}

	// Remove profile
	pricingProfiles.splice(profileIndex, 1);

	// Remove associated adjustments
	for (let i = productAdjustments.length - 1; i >= 0; i--) {
		if (productAdjustments[i].pricingProfileId === id) {
			productAdjustments.splice(i, 1);
		}
	}

	res.status(204).send();
};