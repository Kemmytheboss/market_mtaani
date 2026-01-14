# server/routes/user_routes.py

from flask import request, make_response
from flask_restful import Resource
from models import db, User
from sqlalchemy.exc import IntegrityError

class Users(Resource):
    
    def get(self):
        role = request.args.get('role')
        
        if role:
            users = User.query.filter_by(role=role).all()
        else:
            users = User.query.all()
        
        response_dict_list = [user.to_dict() for user in users]
        
        response = make_response(
            response_dict_list,
            200
        )
        
        return response
    
    def post(self):
        data = request.get_json()
        
        if not data:
            response = make_response(
                {"error": "No data provided"},
                400
            )
            return response
        
        if 'full_name' not in data or not data['full_name']:
            response = make_response(
                {"error": "full_name is required"},
                400
            )
            return response
        
        if 'email' not in data or not data['email']:
            response = make_response(
                {"error": "email is required"},
                400
            )
            return response
        
        if 'password' not in data or not data['password']:
            response = make_response(
                {"error": "password is required"},
                400
            )
            return response
        
        new_user = User(
            full_name=data['full_name'],
            email=data['email'],
            password=data['password'],
            phone=data.get('phone'),
            role=data.get('role'),
            status=data.get('status')
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        response_dict = new_user.to_dict()
        
        response = make_response(
            response_dict,
            201
        )
        
        return response


class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            response = make_response(
                {"error": "User not found"},
                404
            )
            return response
        
        response_dict = user.to_dict()
        
        response = make_response(
            response_dict,
            200
        )
        
        return response
    
    def patch(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            response = make_response(
                {"error": "User not found"},
                404
            )
            return response
        
        data = request.get_json()
        
        if not data:
            response = make_response(
                {"error": "No data provided"},
                400
            )
            return response
        
        allowed_fields = ['full_name', 'email', 'password', 'phone', 'role', 'status']
        
        for key, value in data.items():
            if key in allowed_fields:
                setattr(user, key, value)
        
        db.session.add(user)
        db.session.commit()
        
        response_dict = user.to_dict()
        
        response = make_response(
            response_dict,
            200
        )
        
        return response
    
    def delete(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            response = make_response(
                {"error": "User not found"},
                404
            )
            return response
        
        db.session.delete(user)
        db.session.commit()
        
        response_dict = {"message": "User successfully deleted"}
        
        response = make_response(
            response_dict,
            200
        )
        
        return response