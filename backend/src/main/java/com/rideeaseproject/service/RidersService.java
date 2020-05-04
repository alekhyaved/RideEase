package com.rideeaseproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.repository.BookingsRepo;
import com.rideeaseproject.repository.RidersRepo;

@Service
public class RidersService {
	
	@Autowired
	private  RidersRepo ridersRepo;
	@Autowired 
	private BookingsRepo bookingsRepo;

	private Bookings booking;
	
	
	
	public List<Riders> getRidersForTrip(@RequestParam String email){
		List<Riders> ridersList = new ArrayList<Riders>();
		List<Bookings> bookingList =  bookingsRepo.getRidersForTrip(email);
		for(Bookings booking:bookingList) {
			Riders riders = booking.getRiderId();
			 ridersList.add(riders);
			}
		System.out.println("riders List is as  " + ridersList);
		return ridersList;
	}

}
