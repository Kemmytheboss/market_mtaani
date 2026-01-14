from flask import Blueprint, request, jsonify
from models import db, Business, Product

business_bp = Blueprint('business_bp', __name__)

# CREATE
@business_bp.route('/businesses', methods=['POST'])
def create_business():
    data = request.get_json()
    required = ['user_id', 'business_name']
    if not all(field in data for field in required):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_business = Business(**data)
        db.session.add(new_business)
        db.session.commit()
        return jsonify(new_business.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# GET ALL WITH FILTER
@business_bp.route('/businesses', methods=['GET'])
def get_businesses():
    q = Business.query

    verification_status = request.args.get('verification_status')
    if verification_status:
        q = q.filter_by(verification_status=verification_status)

    businesses = q.all()
    return jsonify([b.to_dict() for b in businesses]), 200

# GET SINGLE
@business_bp.route('/businesses/<int:id>', methods=['GET'])
def get_business(id):
    business = Business.query.get(id)
    if not business:
        return jsonify({"error": "Business not found"}), 404
    return jsonify(business.to_dict()), 200

# PATCH
@business_bp.route('/businesses/<int:id>', methods=['PATCH'])
def update_business(id):
    business = Business.query.get(id)
    if not business:
        return jsonify({"error": "Business not found"}), 404

    data = request.get_json()
    for key, val in data.items():
        setattr(business, key, val)

    db.session.commit()
    return jsonify(business.to_dict()), 200

# DELETE (cascade)
@business_bp.route('/businesses/<int:id>', methods=['DELETE'])
def delete_business(id):
    business = Business.query.get(id)
    if not business:
        return jsonify({"error": "Business not found"}), 404

    db.session.delete(business)
    db.session.commit()
    return jsonify({}), 204
