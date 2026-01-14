from flask import request, make_response
from flask_restful import Resource
from models import db, Business

class Businesses(Resource):

    def get(self):
        verification_status = request.args.get('verification_status')
        q = Business.query

        if verification_status:
            q = q.filter_by(verification_status=verification_status)

        businesses = q.all()
        response_list = [b.to_dict() for b in businesses]

        return make_response(response_list, 200)

    def post(self):
        data = request.get_json()

        if not data:
            return make_response({"error": "No data provided"}, 400)

        required = ['user_id', 'business_name']
        for field in required:
            if field not in data:
                return make_response({"error": f"{field} is required"}, 400)

        new_business = Business(
            user_id=data['user_id'],
            business_name=data['business_name'],
            verification_status=data.get('verification_status'),
            rating=data.get('rating')
        )

        db.session.add(new_business)
        db.session.commit()

        return make_response(new_business.to_dict(), 201)


class BusinessByID(Resource):

    def get(self, id):
        business = Business.query.filter_by(vendor_id=id).first()
        if not business:
            return make_response({"error": "Business not found"}, 404)
        return make_response(business.to_dict(), 200)

    def patch(self, id):
        business = Business.query.filter_by(vendor_id=id).first()
        if not business:
            return make_response({"error": "Business not found"}, 404)

        data = request.get_json()
        if not data:
            return make_response({"error": "No data provided"}, 400)

        for key, value in data.items():
            setattr(business, key, value)

        db.session.commit()
        return make_response(business.to_dict(), 200)

    def delete(self, id):
        business = Business.query.filter_by(vendor_id=id).first()
        if not business:
            return make_response({"error": "Business not found"}, 404)

        db.session.delete(business)
        db.session.commit()
        return make_response({"message": "Business deleted"}, 200)
