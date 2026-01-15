import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Star, Store } from 'lucide-react';

const BusinessCard = ({ business }) => {
    return (
        <Link to={`/shop?business_id=${business.vendor_id}`} className="card block p-6 hover:border-[var(--primary)] transition-colors">
            <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] text-white flex items-center justify-center">
                    <Store className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">{business.business_name}</h3>
                    <div className="flex items-center text-sm text-[var(--accent)]">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span>{business.rating}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span className={`badge ${business.verification_status === 'verified' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {business.verification_status}
                </span>
                <span className="text-sm font-semibold text-[var(--primary)]">Visit Store →</span>
            </div>
        </Link>
    );
};

BusinessCard.propTypes = {
    business: PropTypes.shape({
        vendor_id: PropTypes.number.isRequired,
        business_name: PropTypes.string.isRequired,
        rating: PropTypes.number,
        verification_status: PropTypes.string,
    }).isRequired,
};

export default BusinessCard;
