package com.clothingstore.clothingstore.security;

import com.clothingstore.clothingstore.domain.Customer;
import com.clothingstore.clothingstore.repository.CustomerRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.clothingstore.clothingstore.security.SecurityConstans.EXPIRATION_TIME;
import static com.clothingstore.clothingstore.security.SecurityConstans.SECRET;

@Component
public class JwtTokenProvider {

    @Autowired
    CustomerRepository customerRepository;

    //Generate Token
    public String generateToken(Authentication authentication){
        Customer customer = (Customer) authentication.getPrincipal(); //user has already authenticated
        Date now = new Date(System.currentTimeMillis());
        customer.setLogin_time(now);
        customerRepository.save(customer);

        Date exprTime = new Date(now.getTime() + EXPIRATION_TIME);

        String customerId = Long.toString(customer.getId());

        Map<String,Object> claims = new HashMap<>();
        claims.put("id",customerId);
        claims.put("username",customer.getUsername());
        claims.put("firstName",customer.getFirstName());
        claims.put("authority",customer.getAuthority().getAuthority());
        claims.put("photo",customer.getPhoto());
        claims.put("gender",customer.getGender());

        return Jwts.builder()
                .setSubject(customerId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(exprTime)
                .signWith(SignatureAlgorithm.HS256,SECRET)
                .compact();

    }

    //Validate Token
    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        }catch (SignatureException ex){
            System.out.println("INVALID JWT SIGNATURE");
        }catch (MalformedJwtException ex){
            System.out.println("INVALID JWT TOKEN");
        }catch (ExpiredJwtException ex){
            System.out.println("EXPIRED JWT TOKEN");
        }catch (UnsupportedJwtException ex){
            System.out.println("UNSUPPORTED JWT TOKEN");
        }catch (IllegalArgumentException ex){
            System.out.println("JWT CLAIMS STRING IS EMPTY");
        }
        return false;
    }

    //Get User Id

    public Long getUserIdFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");

        return Long.parseLong(id);

    }
}
