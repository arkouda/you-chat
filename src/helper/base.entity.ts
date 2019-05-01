import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { sanitizeAsync } from 'class-sanitizer';

/**
 * Base entity for the database layer.
 *
 * All entities should extend this class to automatically
 * perform validations on insertions and updates.
 */
export default class BaseEntity {
    @BeforeInsert()
    async validate() {
        try {
            await sanitizeAsync(this);
            var returnObj = await validateOrReject(this);
        } catch (error) {
            console.error(error);
            throw error;
        }
        return returnObj;
    }
    
    @BeforeUpdate()
    async validateUpdate() {
        try {
            await sanitizeAsync(this);
            var returnObj = await validateOrReject(this, { skipMissingProperties: true });
        } catch (error) {
            console.error(error);
            throw error;
        }
        return returnObj;
    }
}